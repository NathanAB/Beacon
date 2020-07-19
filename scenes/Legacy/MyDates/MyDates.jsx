import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ReactGA from 'react-ga';

import { Box, Typography, Button } from '@material-ui/core';
import Store from '../../../store';
import MyDateCard from '../../../components/MyDateCard/MyDateCard';
import { useDesktop } from '../../../utils';
import AddDateForm from '../AddDateForm/AddDateForm';

const styles = () => ({
  title: {
    marginBottom: '25px',
    fontWeight: 600,
  },
  container: {
    margin: 'auto',
    height: '100%',
  },
  container2: {
    padding: '0px 20px',
    height: '100%',
  },
});

function MyDates({ classes }) {
  const store = Store.useStore();
  const userDates = store.get('userDates');
  const user = store.get('user');
  const isDesktop = useDesktop();

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
    <Box paddingTop="calc(50vh - 200px)">
      <Typography align="center" variant="h5">
        <Button
          variant="contained"
          color="primary"
          type="button"
          size="large"
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Open Login Dialog',
              label: 'My Dates Page',
            });
            store.set('isLoginDialogOpen')(true);
          }}
        >
          Log in
        </Button>{' '}
        to start saving dates
      </Typography>
    </Box>
  );

  const renderMyDates = () => {
    const dateCards = userDates.length ? (
      userDates
        .sort(dateSorter)
        .map(userDate => <MyDateCard key={userDate.id} userDate={userDate} />)
    ) : (
      <Typography align="center">
        Hmm... it looks like you don&#39;t have any dates planned. Click Discover to get started!
      </Typography>
    );
    return isDesktop ? (
      <div className={classes.container}>
        {user && (
          <Typography align="center" className={classes.title} variant="h6">
            Upcoming Dates
          </Typography>
        )}
        {user ? dateCards : renderGuest()}
      </div>
    ) : (
      <>
        {user && (
          <Typography align="center" className={classes.title} variant="h6" display="block">
            Upcoming Dates
          </Typography>
        )}
        {user ? dateCards : renderGuest()}
      </>
    );
  };

  return (
    <>
      <AddDateForm />
      <Box className={classes.container2}>{renderMyDates()}</Box>
    </>
  );
}

export default withStyles(styles)(MyDates);
