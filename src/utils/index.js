import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getDates } from '../api';

// eslint-disable-next-line import/prefer-default-export
export const costToString = cost => {
  if (cost === 0) {
    return 'Free';
  }

  const str = [];
  for (let i = 0; i < cost; i += 1) {
    str.push('$');
  }
  return str.join('');
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
          return date.sections.find(section => section.spot.neighborhood.name === filter.value);
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
};
