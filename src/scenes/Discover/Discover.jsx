import React, { useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Store from '../../store';
import FilterBar from './FilterBar/FilterBar';
import DatesList from './DatesList/DatesList';
import NeighborhoodsRow from './NeighborhoodsRow/NeighborhoodsRow';
import DatesRow from './DatesRow/DatesRow';
import TagsRow from './TagsRow/TagsRow';
import DateCard from '../../components/DateCard/DateCard';
import FilterPage from './FilterPage/FilterPage';

function filterDates(dateObjs, filters) {
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
}

function Discover() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const focusedRef = useRef(null);

  const store = Store.useStore();
  const filters = store.get('filters');
  const isFilterPageOpen = store.get('isFilterPageOpen');
  const dates = store.get('dates');
  const focusedDate = store.get('focusedDate');

  const filteredDates = filterDates(dates, filters);
  const dateCards = filteredDates.map(date => {
    const isFocusedDate = parseInt(focusedDate, 10) === date.id;
    return (
      <DateCard
        key={date.id}
        dateObj={date}
        defaultExpanded={isDesktop || isFocusedDate}
        ref={isFocusedDate ? focusedRef : null}
      />
    );
  });

  // Scroll to focused date when clicked on Discover landing page
  useEffect(() => {
    if (focusedDate) {
      window.scrollTo(0, focusedRef.current ? focusedRef.current.offsetTop - 100 : 0);
    }
  }, [focusedDate, focusedRef]);

  function renderContent() {
    if (isFilterPageOpen) {
      return <FilterPage />;
    }

    if (filters.length || focusedDate) {
      return <DatesList>{dateCards}</DatesList>;
    }

    return (
      <>
        <DatesRow />
        <NeighborhoodsRow />

        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Explore by Characteristic
        </Typography>
        <TagsRow isDiscover />
      </>
    );
  }

  return (
    <React.Fragment>
      <FilterBar />
      {renderContent()}
    </React.Fragment>
  );
}

export default Discover;
