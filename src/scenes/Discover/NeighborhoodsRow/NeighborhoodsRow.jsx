import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';

import Store from '../../../store';
import placeholderImg from '../../../assets/img/placeholder.png';

const styles = theme => ({
  container: {
    margin: '1rem 0',
  },
  neighborhood: {
    display: 'inline-block',
    textAlign: 'center',
    padding: 0,
    marginRight: '25px',
    width: '90px',
    verticalAlign: 'top',
    [theme.breakpoints.up('sm')]: {
      width: '100px',
      marginRight: '30px',
    },
  },
  icon: {
    width: '90px',
    height: '90px',
    borderRadius: '45px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
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
    fontSize: '13px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
    },
    fontFamily: 'Raleway',
  },
});

function NeighborhoodsRow({ classes }) {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  function addFilter(neighborhood) {
    console.log(neighborhood);
    ReactGA.event({
      category: 'Interaction',
      action: 'Focus Neighborhood',
      label: neighborhood.name,
    });
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: neighborhood.name,
    });
    store.set('filters')([{ type: 'neighborhood', value: neighborhood }]);
  }

  function renderNeighborhoods() {
    return neighborhoods.map(neighborhood => {
      return (
        <span key={neighborhood.name} className={classes.neighborhood}>
          <div
            className={classes.icon}
            style={{
              backgroundImage: `url(${neighborhood.imageUrl || placeholderImg})`,
            }}
          />
          <Typography variant="subtitle1" className={classes.caption}>
            {neighborhood.name}
          </Typography>
        </span>
      );
    });
  }

  return (
    <section className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Browse by Neighborhood
      </Typography>
      <ScrollMenu
        data={renderNeighborhoods(classes)}
        wheel={false}
        onSelect={neighborhood => {
          addFilter(neighborhood);
        }}
        translate={1}
        arrowLeft={
          isDesktop && (
            <IconButton>
              <Icon>chevron_left</Icon>
            </IconButton>
          )
        }
        arrowRight={
          isDesktop && (
            <IconButton>
              <Icon>chevron_right</Icon>
            </IconButton>
          )
        }
      />
    </section>
  );
}

export default withStyles(styles)(NeighborhoodsRow);
