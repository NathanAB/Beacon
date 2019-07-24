import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Header from '../../components/Header/Header';
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
});

function App() {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');

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
