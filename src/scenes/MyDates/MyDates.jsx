import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ReactGA from 'react-ga';

import { Typography, Button } from '@material-ui/core';
import Store from '../../store';
import DatesList from '../Discover/DatesList/DatesList';
import MyDateCard from '../../components/MyDateCard/MyDateCard';
import { getIsDesktop } from '../../utils';

const styles = () => ({
  title: {
    marginTop: '10px',
    marginBottom: '25px',
    fontWeight: 600,
  },
  container: {
    margin: 'auto',
  },
});

function MyDates({ classes }) {
  const store = Store.useStore();
  const userDates = store.get('userDates');
  const user = store.get('user');
  const isDesktop = getIsDesktop();

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

  const renderGuest = () => (
    <Typography align="center">
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => {
          ReactGA.event({
            category: 'Interaction',
            action: 'Open Login Dialog',
            label: 'My Dates Page',
          });
          store.set('isLoginDialogOpen')(true);
        }}
      >
        Sign in
      </Button>{' '}
      to start saving dates
    </Typography>
  );
  const renderMyDates = () => {
    const dateCards = userDates.length ? (
      userDates
        .sort(dateSorter)
        .map(userDate => <MyDateCard key={userDate.id} userDate={userDate} />)
    ) : (
      <Typography>You have no dates planned yet</Typography>
    );
    return isDesktop ? (
      <div className={classes.container}>
        <Typography align="center" className={classes.title} variant="h6">
          Upcoming Dates
        </Typography>
        {user ? dateCards : renderGuest()}
      </div>
    ) : (
      <>
        <Typography align="center" className={classes.title} variant="h6" display="block">
          Upcoming Dates
        </Typography>
        <DatesList isMyDates>{dateCards}</DatesList>
      </>
    );
  };

  return <>{renderMyDates()}</>;
}

export default withStyles(styles)(MyDates);
