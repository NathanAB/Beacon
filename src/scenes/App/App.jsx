import 'typeface-roboto';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import CONSTANTS from '../../constants';
import Body from '../Body/Body';

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTab: CONSTANTS.TABS.DISCOVER,
      currentDate: [],
    };
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onAddDate = this.onAddDate.bind(this);
  }

  onChangeTab(newTab) {
    this.setState({
      currentTab: newTab,
    });
  }

  onAddDate(date) {
    this.setState(old => ({
      currentDate: old.currentDate.concat(date),
    }));
    console.log(date);
  }

  render() {
    const { currentTab, currentDate } = this.state;
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header />
          <Body
            currentTab={currentTab}
            currentDate={currentDate}
            onAddDate={this.onAddDate}
          />
          <BottomNav onChange={this.onChangeTab} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
