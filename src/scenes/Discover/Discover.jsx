import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';

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
  const [tagFilters, setTagFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);
  const [costFilters, setCostFilters] = useState([]);
  const focusedRef = useRef(null);

  const store = Store.useStore();
  const filters = store.get('filters');
  const isFilterPageOpen = store.get('isFilterPageOpen');
  const dates = store.get('dates');
  const focusedDate = store.get('focusedDate');

  const filteredDates = filterDates(dates, filters);
  const dateCards = filteredDates.map(date => {
    const isFocusedDate = focusedDate === date.id;
    return (
      <DateCard
        key={date.id}
        dateObj={date}
        defaultExpanded={isFocusedDate}
        ref={isFocusedDate ? focusedRef : null}
      />
    );
  });

  // Scroll to focused date when clicked on Discover landing page
  useEffect(() => {
    if (focusedDate) {
      window.scrollTo(0, focusedRef.current.offsetTop);
    }
  }, [focusedDate]);

  const toggleTag = value => () => {
    const currentIndex = tagFilters.indexOf(value);
    const newTagFilters = [...tagFilters];

    if (currentIndex === -1) {
      newTagFilters.push(value);
    } else {
      newTagFilters.splice(currentIndex, 1);
    }

    setTagFilters(newTagFilters);
  };

  const toggleLocationFilter = value => () => {
    const currentIndex = locationFilters.indexOf(value);
    const newLocationFilters = [...locationFilters];

    if (currentIndex === -1) {
      newLocationFilters.push(value);
    } else {
      newLocationFilters.splice(currentIndex, 1);
    }

    setLocationFilters(newLocationFilters);
  };

  const toggleCostFilter = value => () => {
    const currentIndex = costFilters.indexOf(value);
    const newCostFilters = [...costFilters];

    if (currentIndex === -1) {
      newCostFilters.push(value);
    } else {
      newCostFilters.splice(currentIndex, 1);
    }

    setCostFilters(newCostFilters);
  };

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

        <Typography variant="h6">Explore by Characteristic</Typography>
        <TagsRow />
      </>
    );
  }

  return (
    <React.Fragment>
      <FilterBar
        toggleTag={toggleTag}
        tagFilters={tagFilters}
        toggleLocationFilter={toggleLocationFilter}
        locationFilters={locationFilters}
        toggleCostFilter={toggleCostFilter}
        costFilters={costFilters}
      />
      {renderContent()}
    </React.Fragment>
  );
}

export default Discover;
