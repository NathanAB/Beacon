import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';
import DateCard from '../../components/DateCard/DateCard';
import { filterDates, getIsDesktop } from '../../utils';
import DateList from '../../components/DateList/DateList';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

function DateSearch() {
  const focusedRef = useRef(null);
  const isDesktop = getIsDesktop();

  const store = Store.useStore();
  const filters = store.get('filters');
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

  return <DateList>{dateCards}</DateList>;
}

export default withStyles(styles)(DateSearch);
