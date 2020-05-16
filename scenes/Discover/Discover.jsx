import React from 'react';
import { Box } from '@material-ui/core';

import Header from './scenes/Header/Header';
import NewDates from './scenes/NewDates/NewDates';

const Discover = () => {
  return (
    <Box width="100%" maxWidth="1024px" margin="0 auto">
      <Header />
      <NewDates />
    </Box>
  );
};

export default Discover;
