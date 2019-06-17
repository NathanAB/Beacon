import 'typeface-roboto';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import CONSTANTS from '../../constants';
import Body from '../Body/Body';
import Store from '../../store';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      // main: '#ED6565',
      main: '#7e1d4c',
      // main: '#f34e2a',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#E0E0E0',
      // contrastText: '#ED6565',
      contrastText: '#7e1d4c',
    },
  },
});

function App() {
  const store = Store.useStore();
  const checkingOutDate = store.get('checkingOutDate');

  function onChangeTab(newTab) {
    if (newTab === CONSTANTS.TABS.DISCOVER) {
      store.set('filters')([]);
      store.set('isFilterPageOpen')(false);
    }

    store.set('currentTab')(newTab);
  }

  function onAddDate(date) {
    store.set('checkingOutDate')(date);
  }

  const currentTab = store.get('currentTab');
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header />
        <Body
          currentTab={currentTab}
          checkingOutDate={checkingOutDate}
          onAddDate={onAddDate}
          cancelCheckout={() => {}} // TODO
        />
        <BottomNav onChange={onChangeTab} />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
