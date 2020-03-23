import React from 'react';
import { CircularProgress, Box, withStyles } from '@material-ui/core';

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
};

function Spinner({ classes }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      left="0px"
      right="0px"
      top="0px"
      bottom="0px"
      zIndex="99999999"
      className={classes.container}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default withStyles(styles)(Spinner);
