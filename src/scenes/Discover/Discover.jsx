import React, { useEffect, useRef } from 'react';
import { Typography, Button } from '@material-ui/core';
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

const styles = {
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 600,
  },
};

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
      <>
        <DatesRow />
        <NeighborhoodsRow />

        <div className={classes.titleBar}>
          <Typography variant="h6" className={classes.title}>
            Dates by Characteristic
          </Typography>
          <Button onClick={() => store.set('focusedDate')(-1)}>
            <Typography variant="subtitle2">
              <strong>VIEW ALL</strong>
            </Typography>
          </Button>
        </div>
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

export default withStyles(styles)(Discover);
