import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';

import DateCardPreview from '../../../components/DateCardPreview/DateCardPreview';
import Store from '../../../store';

const styles = () => ({
  container: {
    margin: '12px 0',
  },
  dateContainer: {
    marginRight: '1.5rem',
  },
  icon: {
    width: '5rem',
    height: '5rem',
    'background-size': 'cover',
    'border-radius': '2.5rem',
  },
  titleBar: {
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
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
          <DateCardPreview dateObj={date} noExpand />
        </div>
      );
    });
  }

  return (
    <section className={classes.container}>
      <div className={classes.titleBar}>
        <Typography variant="h6" className={classes.title}>
          Discover Dates
        </Typography>
        <Button variant="subtitle1" onClick={() => store.set('focusedDate')(-1)}>
          View All
        </Button>
      </div>
      <ScrollMenu
        data={renderDates(classes)}
        wheel={false}
        onSelect={dateId => {
          ReactGA.event({
            category: 'Interaction',
            action: 'Focus Date',
            label: dateId.toString(),
          });
          store.set('focusedDate')(dateId);
        }}
      />
    </section>
  );
}

export default withStyles(styles)(DatesRow);
