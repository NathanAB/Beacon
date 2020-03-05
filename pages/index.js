import React from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head'

import Store from '../store';
import App from './_app';

// if (window.location.host === 'beacondates.com' || window.location.host === 'app.beacondates.com') {
//   window.location.replace('https://www.beacondates.com');
// }

ReactGA.initialize('UA-54887334-4', {
  debug: true,
});

const Home = () => (
  <Store.Container>
  
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </Store.Container>
);

export default Home;