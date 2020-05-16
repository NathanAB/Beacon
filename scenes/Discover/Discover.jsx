import React from 'react';
import { Box } from '@material-ui/core';

import Header from './scenes/Header/Header';
import NewDates from './scenes/NewDates/NewDates';
import Store from '../../store';
import Subheader from './scenes/Subheader/Subheader';
import Subscribe from './scenes/Subscribe/Subscribe';

const Discover = () => {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const firstFour = dateObjs.slice(0, 4);
  return (
    <Box width="100%" maxWidth="1024px" margin="0 auto">
      <Header />
      <NewDates dateObjs={firstFour} />
      <Subheader />
      <Subscribe />
    </Box>
  );
};

export default Discover;
