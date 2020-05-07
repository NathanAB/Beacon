import React from 'react';
import { Box } from '@material-ui/core';
import Paper from '../../components/Paper/Paper';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';

const Discover = () => {
  return (
    <Box display="flex" margin="20px">
      <div>
        <h1>Date night at home?</h1>
        <h4>We&apos;ve got you covered with fun & fresh date ideas.</h4>
      </div>
      <Paper>
        <span>Neighborhood</span>
        <Select />
        <span>Vibe</span>
        <Select />
        <Button variant={Button.VARIANTS.PRIMARY}>Search dates</Button>
      </Paper>
    </Box>
  );
};

export default Discover;
