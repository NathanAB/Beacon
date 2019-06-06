import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const NEIGHBORHOODS = [
  {
    name: 'Georgetown',
    image:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fpics4.city-data.com%2Fcpicv%2Fvfiles24873.jpg&f=1',
  },
  {
    name: 'H Street',
    image:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fassets.urbanturf.com%2Fdc%2Fimages%2Fblog%2F2009%2F10%2FTAYLOR_NCINDC.jpg&f=1',
  },
  {
    name: 'Capitol Hill',
    image:
      'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F01%2F65%2Ff8%2Fe5%2Fcaption.jpg&f=1',
  },
  {
    name: 'U Street',
    image:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.culturaltourismdc.org%2Fportal%2Fimage%2Fimage_gallery%3Fuuid%3D01192ccb-9293-464c-8680-d2024261a05c%26groupId%3D701982%26t%3D1395174609912&f=1',
  },
  {
    name: 'Dupont',
    image:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fpics4.city-data.com%2Fcpicv%2Fvfiles24873.jpg&f=1',
  },
];

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
    width: '32.5rem',
  },
  neighborhood: {
    display: 'inline-block',
    'text-align': 'center',
    'margin-right': '1.5rem',
  },
  icon: {
    width: '5rem',
    height: '5rem',
    'background-size': 'cover',
    'border-radius': '2.5rem',
  },
  caption: {},
});

function renderNeighborhoods(classes) {
  return NEIGHBORHOODS.map(neighborhood => {
    return (
      <div className={classes.neighborhood}>
        <div className={classes.icon} style={{ backgroundImage: `url(${neighborhood.image})` }} />
        <Typography variant="caption" className={classes.caption}>
          {neighborhood.name}
        </Typography>
      </div>
    );
  });
}

function NeighborhoodsRow({ classes }) {
  return (
    <section className={classes.container}>
      <Typography variant="h6" className={classes.caption}>
        Browse by Neighborhood
      </Typography>
      <div className={classes.rowContainer}>
        <div className={classes.row}>{renderNeighborhoods(classes)}</div>
      </div>
    </section>
  );
}

export default withStyles(styles)(NeighborhoodsRow);
