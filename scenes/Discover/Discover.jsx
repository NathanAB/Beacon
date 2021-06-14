import React from 'react';
import { Box } from '@material-ui/core';

import Header from './scenes/Header/Header';
import NewDates from './scenes/NewDates/NewDates';
import Store from '../../store';
import Subheader from './scenes/Subheader/Subheader';
// import Subscribe from './scenes/Subscribe/Subscribe';
import { useMobile } from '../../utils';

const Discover = () => {
  const isMobile = useMobile();
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const newDates = dateObjs.filter(date => date.new).slice(0, isMobile ? 4 : 6);
  return (
    <Box width="100%" maxWidth="1024px" margin="0 auto" position="relative" zIndex="0">
      <Header />
      <NewDates dateObjs={newDates} />
      <Subheader />
      {/* TODO: Implement subscribe widget */}
      {/* <Subscribe /> */}
    </Box>
  );
};

export default Discover;
