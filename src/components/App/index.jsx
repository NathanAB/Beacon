import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import './App.css';
import Header from '../Header';
import Body from '../Body';
import BottomNav from '../BottomNav';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ed6565',
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header />
        <Body />
        <BottomNav />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
