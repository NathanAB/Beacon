import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';

import { getDates, getNeighborhoods } from '../api';

const COST_MAP = ['Free', 'Under $30', '$30 to $100', '$100+'];

// eslint-disable-next-line import/prefer-default-export
export const costToString = cost => {
  return COST_MAP[parseInt(cost, 10)];
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
            if (filter.value === 'Free' && section.cost === 0) {
              return true;
            }
            return section.cost === filter.value.length;
          });
        case 'duration':
          // eslint-disable-next-line
          const filterMinutes = parseInt(filter.value.slice(0, 1)) * 60;
          return totalTime <= filterMinutes + 30 && totalTime >= filterMinutes - 30;
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
  console.log(filterArray, filterArray.map(f => `${f.type}:${f.value}`).join(','));
  return filterArray.map(f => `${f.type}:${f.value}`).join(',');
};

export const filterStringToArr = filterString => {
  const filterArray = [];
  filterString.split(',').forEach(f => {
    const split = f.split(':');
    filterArray.push({
      type: split[0],
      value: split[1],
    });
  });
  console.log(filterString, filterArray);
  return filterArray;
};

export const useFilters = () => {
  const router = useRouter();
  const filterString = router?.query?.filters;
  let filters = [];

  /**
   * Set new filter query and optionally navigate to anew page with them.
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
