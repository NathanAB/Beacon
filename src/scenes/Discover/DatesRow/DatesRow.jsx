import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';

import DateCardPreview from '../../../components/DateCardPreview/DateCardPreview';
import Store from '../../../store';

const styles = () => ({
  container: {
    margin: '1rem 0',
  },
  dateContainer: {
    'margin-right': '1.5rem',
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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
      <Typography variant="h6" className={classes.title}>
        Discover Dates
      </Typography>
      <ScrollMenu
        data={renderDates(classes)}
        wheel={false}
        translate={1}
        onSelect={dateId => {
          ReactGA.event({
            category: 'Interaction',
            action: 'Focus Date',
            label: dateId.toString(),
          });
          store.set('focusedDate')(dateId);
        }}
        arrowLeft={
          isDesktop && (
            <IconButton>
              <Icon>chevron_left</Icon>
            </IconButton>
          )
        }
        arrowRight={
          isDesktop && (
            <IconButton>
              <Icon>chevron_right</Icon>
            </IconButton>
          )
        }
      />
    </section>
  );
}

export default withStyles(styles)(DatesRow);
