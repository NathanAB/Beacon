import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';

import Store from '../store';
import Body from '../scenes/Body/Body';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import theme from '../theme';

import '../css/index.css';

export default class BeaconApp extends App {
  componentDidMount() {
    ReactGA.initialize('UA-54887334-4', {
      debug: true,
    });

    // Force redirect to www
    if (
      window.location.host === 'beacondates.com' ||
      window.location.host === 'app.beacondates.com'
    ) {
      window.location.replace('https://www.beacondates.com');
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Store.Container>
        <Head>
          <title>Washington DC Date Ideas | Beacon</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <meta name="theme-color" content="#F15F3A" />
          <meta
            name="description"
            content="Date night in DC? We've got you covered with fun & fresh date ideas."
          />
          <meta charSet="utf-8" />
        </Head>
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <ErrorBoundary>
              <Body {...this.props} />
            </ErrorBoundary>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Store.Container>
    );
  }
}
