import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Store from '../../../store';
import placeholderImg from '../../../assets/img/placeholder.png';

const styles = theme => ({
  container: {
    margin: '1rem 0',
  },
  rowContainer: {
    width: 'calc(100vw - 25px)',
    'overflow-x': 'scroll',
    '-ms-overflow-style': 'none',
    overflow: '-moz-scrollbars-none',
    '&::-webkit-scrollbar': { width: '0 !important' },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  row: {
    whiteSpace: 'nowrap',
  },
  neighborhood: {
    display: 'inline-block',
    textAlign: 'center',
    padding: 0,
    marginRight: '25px',
    width: '70px',
    [theme.breakpoints.up('sm')]: {
      width: '100px',
      marginRight: '30px',
    },
  },
  icon: {
    width: '70px',
    height: '70px',
    backgroundSize: 'cover',
    borderRadius: '35px',
    [theme.breakpoints.up('sm')]: {
      height: '100px',
      width: '100px',
      borderRadius: '50px',
    },
  },
  title: {
    fontWeight: 600,
  },
  caption: {
    whiteSpace: 'normal',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
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
          <div
            className={classes.icon}
            style={{
              backgroundImage: `url(${neighborhood.imageUrl || placeholderImg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          />
          <Typography variant="caption" className={classes.caption}>
            {neighborhood.name}
          </Typography>
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
