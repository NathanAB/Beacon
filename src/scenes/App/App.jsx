import 'typeface-roboto';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import BottomNav from '../BottomNav/BottomNav';
import CONSTANTS from '../../constants';
import Body from '../Body/Body';
import Store from '../../store';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
        <Header />
        <Body
          currentTab={currentTab}
          cancelCheckout={() => {}} // TODO
        />
        <BottomNav onChange={onChangeTab} />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
