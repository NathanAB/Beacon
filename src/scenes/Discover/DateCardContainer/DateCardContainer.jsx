import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

function DateCardContainer({ children }) {
  // eslint-disable-next-line
  const gridCards = children.map(child => <Grid item xs>{ child }</Grid>);

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
      spacing={32}
    >
      { gridCards }
    </Grid>
  );
}

DateCardContainer.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default withStyles(styles)(DateCardContainer);