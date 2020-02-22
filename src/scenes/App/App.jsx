import React, { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ReactGA from 'react-ga';

import * as api from '../../api';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';
import Body from '../Body/Body';
import Store from '../../store';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { useDesktop } from '../../utils';
import Footer from '../Footer/Footer';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#fec838',
      main: '#F15F3A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#2E2E2E',
      contrastText: '#333333',
      text: '#525252',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  breakpoints: {
    values: {
      sm: 768,
    },
  },
});

function App() {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');
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
    const getDates = async () => {
      const dates = await api.getDates();
      if (dates) {
        store.set('dates')(dates);
      }
    };
    const getNeighborhoods = async () => {
      let neigborhoods = await api.getNeighborhoods();
      neigborhoods = neigborhoods.filter(n => !n.disabled);

      if (neigborhoods) {
        store.set('neighborhoods')(neigborhoods);
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
    getDates();
    getNeighborhoods();
    getTags();
    getActivities();
  }, []);

  return (
    <div className="app">
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ErrorBoundary>
            <Header />
            <Body currentTab={currentTab} />
            {isDesktop ? <Footer /> : <BottomNav />}
          </ErrorBoundary>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
