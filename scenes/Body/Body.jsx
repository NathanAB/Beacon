import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ReactGA from 'react-ga';
import LogRocket from 'logrocket';
import { toast } from 'react-toastify';

import moment from 'moment';
import Footer from '../../components/Footer/Footer';
import AppBar from '../../components/AppBar/AppBar';
import LoginToast from '../../components/LoginToast/LoginToast';

import * as api from '../../api';
import Store from '../../store';
import { loadDates, saveLocalLikes } from '../../utils';
import constants from '../../constants';

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
    const getLikedDates = async () => {
      const likedDates = await api.getLikedDates();
      if (likedDates) {
        store.set('likedDates')(likedDates);
      }
    };
    const initialReqs = async () => {
      const authData = await api.auth();
      if (authData) {
        store.set('user')(authData);
        ReactGA.set({ userEmail: authData.email, userId: authData.email });
        LogRocket.identify(authData.email, {
          name: authData.name,
          email: authData.email,
        });
        const { membershipEnd } = authData.dataValues;
        const isMember = membershipEnd && moment(membershipEnd).isAfter(moment());
        store.set('isMember')(isMember);
        const savedLikes = await saveLocalLikes();
        if (sessionStorage.getItem(constants.FLAGS.FRESH_LOGIN) && savedLikes) {
          toast(<LoginToast firstName={authData.given_name} />, {
            position: 'bottom-right',
            hideProgressBar: true,
          });
          sessionStorage.removeItem(constants.FLAGS.FRESH_LOGIN);
        }
        getUserDates();
        getLikedDates();
      } else {
        try {
          store.set('likedDates')(JSON.parse(localStorage.getItem('likedDates')) || []);
        } catch (e) {
          store.set('likedDates')([]);
        }
      }
      loadDates(store, authData);
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
    const getUsers = async () => {
      const users = await api.getUsers();
      if (users) {
        store.set('users')(users);
      }
    };
    const getActivities = async () => {
      const activities = await api.getActivities();
      if (activities) {
        store.set('activities')(activities);
      }
    };
    initialReqs();
    getTags();
    getActivities();
    getUsers();
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" overflow="hidden">
      <AppBar />
      <Component {...pageProps} />
      <Footer />
    </Box>
  );
};
