import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FilterBar from '../FilterBar/FilterBar';
import DatesList from './DatesList/DatesList';
import { filterDates, useDesktop } from '../../utils';
import DateCard from '../../components/DateCard/DateCard';
import Store from '../../store';
import AddDateForm from '../AddDateForm/AddDateForm';

const styles = () => ({
  listContainer: {
    padding: '0px 20px',
  },
});

const Search = ({ classes }) => {
  const store = Store.useStore();
  const filters = store.get('filters');
  const dates = store.get('dates');
  const isDesktop = useDesktop();
  const filteredDates = filterDates(dates, filters);

  const focusedRef = useRef(null);

  const focusedDate = store.get('focusedDate');

  // Scroll to focused date when clicked on Discover landing page
  useEffect(() => {
    if (focusedDate) {
      window.scrollTo(0, focusedRef.current ? focusedRef.current.offsetTop - 100 : 0);
    }
  }, [focusedDate, focusedRef]);

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

  return (
    <>
      <AddDateForm />
      <FilterBar />
      <Box className={classes.listContainer}>
        <DatesList>{dateCards}</DatesList>
      </Box>
    </>
  );
};

export default withStyles(styles)(Search);
