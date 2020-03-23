import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ReactGA from 'react-ga';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BottomNav from '../BottomNav/BottomNav';

import * as api from '../../api';
import Store from '../../store';
import { useDesktop, loadDates } from '../../utils';

export default ({ Component, pageProps }) => {
  const store = Store.useStore();
  const isDesktop = useDesktop();

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
        getUserDates();
      }
    };
    const getNeighborhoods = async () => {
      let neighborhoods = await api.getNeighborhoods();
      neighborhoods = neighborhoods.filter(n => !n.disabled);

      if (neighborhoods) {
        store.set('neighborhoods')(neighborhoods);
      }
    };
    const getTags = async () => {
      const tags = await api.getTags();
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
    getNeighborhoods();
    getTags();
    getActivities();
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box
        margin="auto"
        paddingTop="80px"
        paddingBottom="80px"
        maxWidth="1100px"
        width="100%"
        flexGrow="2"
      >
        <Component {...pageProps} />
      </Box>
      {/* TODO - Add responsiveness for BottomNav */}
      {isDesktop ? <Footer /> : <BottomNav />}
    </Box>
  );
};
