import React, { useEffect, useRef } from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';
import FilterBar from '../FilterBar/FilterBar';
import NeighborhoodsRow from './NeighborhoodsRow/NeighborhoodsRow';
import DatesRow from './DatesRow/DatesRow';
import TagsRow from '../TagsRow/TagsRow';

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

  const store = Store.useStore();
  const focusedDate = store.get('focusedDate');

  // Scroll to focused date when clicked on Discover landing page
  useEffect(() => {
    if (focusedDate) {
      window.scrollTo(0, focusedRef.current ? focusedRef.current.offsetTop - 100 : 0);
    }
  }, [focusedDate, focusedRef]);

  function renderContent() {
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
