import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import './App.css';
import Header from '../Header/Header';
import Body from '../Body/Body';
import BottomNav from '../BottomNav/BottomNav';
import CONSTANTS from '../../constants';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ED6565',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#E0E0E0',
      contrastText: '#ED6565',
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
