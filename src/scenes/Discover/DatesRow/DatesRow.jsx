import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactGA from 'react-ga';

import DateCardPreview from '../../../components/DateCardPreview/DateCardPreview';
import Store from '../../../store';

const styles = () => ({
  container: {
    margin: '12px 0',
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
  const dateObjs = store.get('dates');

  const dateCards = dateObjs.map(date => {
    return (
      <div className={classes.dateContainer} key={date.id}>
        <DateCardPreview dateObj={date} noExpand />
      </div>
    );
  });

  return (
    <section className={classes.container}>
      <div className={classes.titleBar}>
        <Typography variant="h6" className={classes.title}>
          Discover Dates
        </Typography>
        <Button onClick={() => store.set('focusedDate')(-1)}>
          <Typography variant="subtitle2">
            <strong>VIEW ALL</strong>
          </Typography>
        </Button>
      </div>
      {dateObjs.length ? (
        <ScrollMenu
          data={dateCards}
          wheel={false}
          alignOnResize={false}
          translate={1}
          itemStyle={{
            paddingRight: '20px',
          }}
          onSelect={dateId => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Focus Date',
              label: dateId.toString(),
            });
            store.set('focusedDate')(dateId);
          }}
        />
      ) : (
        <CircularProgress />
      )}
    </section>
  );
}

export default withStyles(styles)(DatesRow);
