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
      main: '#ED6565',
      contrastText: '#F5F5F5',
    },
    secondary: {
      main: '#F5F5F5',
      dark: '#E0E0E0',
      contrastText: '#ED6565',
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
