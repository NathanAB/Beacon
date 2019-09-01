import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import DateCardPreview from '../../../components/DateCardPreview/DateCardPreview';
import Store from '../../../store';

const styles = theme => ({
  container: {
    margin: '1rem 0',
  },
  rowContainer: {
    width: 'calc(100vw - 25px)',
    'overflow-x': 'scroll',
    '-ms-overflow-style': 'none',
    overflow: '-moz-scrollbars-none',
    '&::-webkit-scrollbar': { width: '0 !important' },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  row: {
    whiteSpace: 'nowrap',
  },
  dateContainer: {
    display: 'inline-block',
    'margin-right': '1.5rem',
    'vertical-align': 'top',
  },
  icon: {
    width: '5rem',
    height: '5rem',
    'background-size': 'cover',
    'border-radius': '2.5rem',
  },
  title: {
    fontWeight: 600,
  },
});

function DatesRow({ classes }) {
  const store = Store.useStore();
  const DateObjs = store.get('dates');

  function renderDates() {
    return DateObjs.map(date => {
      return (
        <div className={classes.dateContainer} key={date.id}>
          <DateCardPreview
            dateObj={date}
            onClick={() => {
              store.set('focusedDate')(date.id);
            }}
            noExpand
          />
        </div>
      );
    });
  }

  return (
    <section className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Discover Dates
      </Typography>
      <div className={classes.rowContainer}>
        <div className={classes.row}>{renderDates(classes)}</div>
      </div>
    </section>
  );
}

export default withStyles(styles)(DatesRow);
