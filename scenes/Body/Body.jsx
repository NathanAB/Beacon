import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ReactGA from 'react-ga';
import LogRocket from 'logrocket';

import Footer from '../../components/Footer/Footer';

import * as api from '../../api';
import Store from '../../store';
import { loadDates } from '../../utils';

export default ({ Component, pageProps }) => {
  const store = Store.useStore();

  // Make initial API requests
  useEffect(() => {
    const getUserDates = async () => {
      const userDates = await api.getUserDates();
      if (userDates) {
        store.set('userDates')(userDates);
      }
    };
    const initialReqs = async () => {
      const authData = await api.auth();
      if (authData) {
        store.set('user')(authData);
        ReactGA.set({ userEmail: authData.email });
        LogRocket.identify(authData.email, {
          name: authData.name,
          email: authData.email,
        });
        getUserDates();
      }
    };
    const getTags = async () => {
      let tags = await api.getTags();
      tags = tags.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      if (tags) {
        store.set('tags')(tags);
      }
    };
    const getActivities = async () => {
      const activities = await api.getActivities();
      if (activities) {
        store.set('activities')(activities);
      }
    };
    initialReqs();
    loadDates(store);
    getTags();
    getActivities();
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" overflow="hidden">
      <Component {...pageProps} />
      <Footer />
    </Box>
  );
};
