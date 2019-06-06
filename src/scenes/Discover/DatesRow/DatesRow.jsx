import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import DateObjs from '../../../mocks/dates';
import DateCard from '../../../components/DateCard/DateCard';

const styles = () => ({
  container: {
    margin: '1rem 0',
  },
  rowContainer: {
    width: 'calc(100vw - 25px)',
    'overflow-x': 'scroll',
    '-ms-overflow-style': 'none',
    overflow: '-moz-scrollbars-none',
    '&::-webkit-scrollbar': { width: '0 !important' },
  },
  row: {
    width: '1200px',
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
  caption: {},
});

function renderDates(classes) {
  return DateObjs.map(date => {
    return (
      <div className={classes.dateContainer}>
        <DateCard dateObj={date} />
      </div>
    );
  });
}

function DatesRow({ classes }) {
  return (
    <section className={classes.container}>
      <Typography variant="h6" className={classes.caption}>
        Discover Dates
      </Typography>
      <div className={classes.rowContainer}>
        <div className={classes.row}>{renderDates(classes)}</div>
      </div>
    </section>
  );
}

export default withStyles(styles)(DatesRow);
