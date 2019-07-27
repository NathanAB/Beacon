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
    : 'No dates match your filters. Try something else?';

  if (!children.length) {
    return <Typography variant="h6">{emptyMessage}</Typography>;
  }

  // eslint-disable-next-line
  const gridCards = children.map((child, i) => <Grid key={i} item xs>{ child }</Grid>);

  return (
    <Grid container direction="row" justify="space-around" alignItems="flex-start" spacing={2}>
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
