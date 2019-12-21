import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';
import { filterDates, getIsDesktop } from '../../utils';
import FilterBar from './FilterBar/FilterBar';
import DatesList from './DatesList/DatesList';
import NeighborhoodsRow from './NeighborhoodsRow/NeighborhoodsRow';
import DatesRow from './DatesRow/DatesRow';
import TagsRow from './TagsRow/TagsRow';
import DateCard from '../../components/DateCard/DateCard';
import FilterPage from './FilterPage/FilterPage';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {},
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    padding: '0px 20px',
  },
  title: {
    fontWeight: 600,
  },
});

function Discover({ classes }) {
  const focusedRef = useRef(null);
  const isDesktop = getIsDesktop();

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
        defaultExpanded={isDesktop}
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
      <Box className={classes.container}>
        <FilterBar />
        <DatesRow />
        <NeighborhoodsRow />

        <Box className={classes.tagsContainer}>
          <Typography variant="h6" className={classes.title}>
            Dates by Characteristic
          </Typography>
          <TagsRow isDiscover />
        </Box>
      </Box>
    );
  }

  return <React.Fragment>{renderContent()}</React.Fragment>;
}

export default withStyles(styles)(Discover);
