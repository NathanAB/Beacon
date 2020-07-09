import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as reactResponsive from 'react-responsive';
import { useRouter } from 'next/router';
import moment from 'moment';

import { getDates, getNeighborhoods } from '../api';

const COST_MAP = ['Free', 'Under $30', '$30 to $60', '$60+'];
const COST_LOOKUP = {
  Free: 0,
  'Under $30': 1,
  '$30 to $60': 2,
  '$60+': 3,
};

// eslint-disable-next-line import/prefer-default-export
export const costToString = cost => {
  return COST_MAP[parseInt(cost, 10)];
};

export const getDateCost = dateObj => {
  const { sections } = dateObj;
  const dateCost = sections.reduce((total, section) => total + section.cost, 0) / sections.length;
  return costToString(dateCost);
};

export const getDateLength = dateObj => {
  const { sections } = dateObj;
  const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
  return Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
};

export const filterDates = (dateObjs, filters) => {
  if (!filters.length) {
    return dateObjs;
  }

  return dateObjs.filter(date => {
    const filtersMet = filters.filter(filter => {
      const totalTime = date.sections.reduce((total, section) => total + section.minutes, 0);
      switch (filter.type) {
        // Filter condition met if one of the date sections contains the criterion
        case 'tag':
          return date.sections.find(section => section.tags.find(tag => tag.name === filter.value));
        case 'neighborhood':
          return date.sections.find(section => section.spot?.neighborhood?.name === filter.value);
        case 'cost':
          return date.sections.find(section => {
            return section.cost === COST_LOOKUP[filter.value];
          });
        case 'duration':
          // eslint-disable-next-line
          const filterMinutes = parseInt(filter.value.slice(0, 1)) * 60;
          return totalTime < filterMinutes + 30 && totalTime >= filterMinutes - 30;
        default:
          return false;
      }
    }).length;
    return filtersMet === filters.length;
  });
};

export const useDesktop = () => {
  return useMediaQuery('(min-width:768px)');
};

export const shuffleArray = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];

    /* eslint-disable no-param-reassign */
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    /* eslint-enable no-param-reassign */
  }

  return array;
};

export const loadDates = async store => {
  let adminDates = await getDates();
  const dates = adminDates.filter(date => date.active);
  shuffleArray(dates);
  adminDates = adminDates.sort((a, b) => {
    if ((a.active && b.active) || (!a.active && !b.active)) {
      return 0;
    }
    if (a.active) {
      return -1;
    }
    if (b.active) {
      return 1;
    }
  });
  store.set('adminDates')(adminDates);
  store.set('dates')(dates);

  let allNeighborhoods = await getNeighborhoods();
  allNeighborhoods = allNeighborhoods.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const neighborhoods = allNeighborhoods.filter(
    neighborhood =>
      !neighborhood.disabled &&
      dates.some(date =>
        date.sections.some(section => section.spot.neighborhoodId === neighborhood.neighborhoodId),
      ),
  );

  if (neighborhoods) {
    store.set('allNeighborhoods')(allNeighborhoods);
    store.set('neighborhoods')(neighborhoods);
  }
};

export const filterArrayToString = filterArray => {
  return encodeURIComponent(filterArray.map(f => `${f.type}:${f.value}`).join(','));
};

export const filterStringToArr = filterString => {
  const filterArray = [];
  decodeURIComponent(filterString)
    .split(',')
    .forEach(f => {
      const split = f.split(':');
      filterArray.push({
        type: split[0],
        value: split[1],
      });
    });
  return filterArray;
};

export const useFilters = () => {
  const router = useRouter();
  const filterString = router?.query?.filters;
  let filters = [];

  /**
   * Set new filter query and optionally navigate to an ew page with them.
   * @param {Array<Object>} newFilters The new filters to set in the query string.
   * @param {String} [path] Optional - path to navigate to with new query.
   */
  const setFilters = async (newFilters, path) => {
    const method = path ? 'push' : 'replace';

    const newFilterString = filterArrayToString(newFilters);

    return router[method](`${path || router.pathname}?filters=${newFilterString}`, {
      pathname: path || router.pathname,
      query: { filters: newFilterString },
    });
  };

  if (filterString) {
    try {
      filters = filterStringToArr(filterString);
    } catch (err) {
      console.error(err);
    }
  }
  return [filters, setFilters];
};

export const useFocusedDate = () => {
  const router = useRouter();
  let focusedDateId;
  const focusedDateQuery = router?.query?.date;
  if (focusedDateQuery) {
    focusedDateId = parseInt(focusedDateQuery, 10);
  }

  /**
   * Set new focused date query and optionally navigate to a new page with them.
   * @param {int} newFocusedDateId The new date id to set as focused in the query string.
   * @param {String} [path] Optional - path to navigate to with new query.
   */
  const setFocusedDate = async (newFocusedDateId, path) => {
    const query = {};
    let pathStr = path || router.pathname;
    if (newFocusedDateId) {
      pathStr = `${pathStr}?date=${newFocusedDateId}`;
      query.date = newFocusedDateId;
    }
    return router.push(pathStr, {
      pathname: path || router.pathname,
      query,
    });
  };

  return [focusedDateId, setFocusedDate];
};

export const useMobile = () => {
  return reactResponsive.useMediaQuery({
    query: '(max-width: 768px)',
  });
};

export const dateSorterNewest = (date1, date2) => {
  const time1 = date1.createdAt;
  const time2 = date2.createdAt;
  if (time1 > time2) {
    return -1;
  }
  if (time1 < time2) {
    return 1;
  }
  return 0;
};

export const dateSorterOldest = (date1, date2) => dateSorterNewest(date2, date1);

export const createCalendarEvent = dateObj => {
  const dateLength = getDateLength(dateObj);
  let calendarEventDescription = `<p>${dateObj.description}</p><ol>`;
  dateObj.sections.forEach(section => {
    calendarEventDescription += `<li><b>${section.spot.name}</b>\n${section.description}</li>`;
  });
  calendarEventDescription += '</ol>';

  const calendarLocation = `From "${dateObj.sections[0].spot.name}" to "${dateObj.sections[1].spot.name}"`;

  return {
    title: `Beacon | ${dateObj.name}`,
    description: calendarEventDescription,
    duration: dateLength,
    location: calendarLocation,
    startDatetime: new Date().toISOString(),
    endDatetime: new Date(Date.now() + dateLength * 3600).toISOString(),
  };
};
