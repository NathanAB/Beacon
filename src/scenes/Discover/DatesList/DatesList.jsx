import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

function DatesList({ children, isMyDates }) {
  const emptyMessage = isMyDates
    ? 'You have no dates planned.'
    : 'Sorry, no dates match your filters. Check back soon as we add new dates weekly!';

  if (!children.length) {
    return <Typography variant="h6">{emptyMessage}</Typography>;
  }

  // eslint-disable-next-line
  const gridCards = children.map((child, i) => <Grid key={i} item xs>{ child }</Grid>);

  return (
    <Grid container direction="column" justify="space-around" alignItems="flex-start" spacing={3}>
      {gridCards}
    </Grid>
  );
}

DatesList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMyDates: PropTypes.bool,
};

DatesList.defaultProps = {
  isMyDates: false,
};

export default withStyles(styles)(DatesList);
