import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

function DateCardContainer(props) {
  // eslint-disable-next-line
  const gridCards = props.children.map(child => <Grid item>{ child }</Grid>);

  return (
    <Grid
      container
      spacing={32}
      justify="space-evenly"
      style={{
        margin: 0,
        width: '100%',
      }}
    >
      { gridCards }
    </Grid>
  );
}

DateCardContainer.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default withStyles(styles)(DateCardContainer);
