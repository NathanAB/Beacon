import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

import { Typography } from '@material-ui/core';
import Store from '../../store';
import DatesList from '../Discover/DatesList/DatesList';
import UserDateCard from '../../components/UserDateCard/UserDateCard';

const styles = theme => ({
  title: {
    marginTop: '10px',
    marginBottom: '25px',
  },
  container: {
    maxWidth: '768px',
    margin: 'auto',
  },
});

function MyDates({ classes }) {
  const store = Store.useStore();
  const userDates = store.get('userDates');

  const dateSorter = (date1, date2) => {
    const time1 = moment(date1.startTime).toISOString();
    const time2 = moment(date2.startTime).toISOString();
    if (time1 > time2) {
      return -1;
    }
    if (time1 < time2) {
      return 1;
    }
    return 0;
  };

  function renderMyDates() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const dateCards = userDates.length
      ? userDates
          .sort(dateSorter)
          .map(userDate => <UserDateCard key={userDate.dateId} userDate={userDate} />)
      : 'You have no dates planned yet';
    // const dateCards = [<UserDateCard />];
    return isDesktop ? (
      <div className={classes.container}>
        <Typography align="center" className={classes.title} variant="h6">
          My Dates
        </Typography>
        {dateCards}
      </div>
    ) : (
      <>
        <Typography align="center" className={classes.title} variant="h6" display="block">
          My Dates
        </Typography>
        <DatesList isMyDates>{dateCards}</DatesList>
      </>
    );
  }

  return <>{renderMyDates()}</>;
}

export default withStyles(styles)(MyDates);
