import React, { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import * as api from '../../api';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';
import CONSTANTS from '../../constants';
import Body from '../Body/Body';
import Store from '../../store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fec838',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#e8e8e8',
      dark: '#E0E0E0',
      contrastText: '#7e1d4c',
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
      const neigborhoods = await api.getNeighborhoods();
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
    initialReqs();
    getDates();
    getNeighborhoods();
    getTags();
  }, []);

  function onChangeTab(newTab) {
    if (newTab === CONSTANTS.TABS.DISCOVER) {
      store.set('filters')([]);
      store.set('isFilterPageOpen')(false);
    }

    store.set('currentTab')(newTab);
  }

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Header />
          <Body
            currentTab={currentTab}
            cancelCheckout={() => {}} // TODO
          />
          <BottomNav onChange={onChangeTab} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
