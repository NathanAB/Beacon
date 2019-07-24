import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Store from '../../../store';

const styles = () => ({
  container: {
    margin: '1rem 0',
  },
  rowContainer: {
    width: 'calc(100vw - 25px)',
    'overflow-x': 'scroll',
    '-ms-overflow-style': 'none',
    overflow: '-moz-scrollbars-none',
    '&::-webkit-scrollbar': { width: '0 !important' },
  },
  row: {
    width: '41rem',
  },
  neighborhood: {
    display: 'inline-block',
    'text-align': 'center',
    padding: 0,
    'margin-right': '1.5rem',
  },
  icon: {
    width: '5rem',
    height: '5rem',
    'background-size': 'cover',
    'border-radius': '2.5rem',
  },
  title: {
    fontWeight: 600,
  },
});

function NeighborhoodsRow({ classes }) {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');

  function addFilter(neighborhood) {
    store.set('filters')([{ type: 'neighborhood', value: neighborhood }]);
  }

  function renderNeighborhoods() {
    return neighborhoods.map(neighborhood => {
      return (
        <button
          key={neighborhood.name}
          type="button"
          className={classes.neighborhood}
          onClick={() => addFilter(neighborhood.name)}
        >
          <div className={classes.icon} style={{ backgroundImage: `url(${neighborhood.image})` }} />
          <Typography variant="caption">{neighborhood.name}</Typography>
        </button>
      );
    });
  }

  return (
    <section className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Browse by Neighborhood
      </Typography>
      <div className={classes.rowContainer}>
        <div className={classes.row}>{renderNeighborhoods(classes)}</div>
      </div>
    </section>
  );
}

export default withStyles(styles)(NeighborhoodsRow);
