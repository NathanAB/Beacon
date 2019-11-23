import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, ButtonBase, CircularProgress } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactGA from 'react-ga';

import Store from '../../../store';
import placeholderImg from '../../../assets/img/placeholder.png';

const styles = theme => ({
  container: {
    margin: '12px 0',
  },
  neighborhood: {
    display: 'inline-block',
    textAlign: 'center',
    padding: 0,
    width: '90px',
    verticalAlign: 'top',
    [theme.breakpoints.up('sm')]: {
      width: '100px',
    },
  },
  icon: {
    width: '90px',
    height: '90px',
    borderRadius: '45px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      height: '100px',
      width: '100px',
      borderRadius: '50px',
    },
  },
  titleBar: {
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 600,
  },
  caption: {
    fontWeight: 600,
    whiteSpace: 'normal',
    fontSize: '13px',
    lineHeight: '22px',
    fontFamily: 'Raleway',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
});

function NeighborhoodsRow({ classes }) {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');

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
    window.scrollTo(0, 0);
  }

  function renderNeighborhoods() {
    return neighborhoods.map(neighborhood => {
      return (
        <ButtonBase type="button" key={neighborhood.name} className={classes.neighborhood}>
          <div
            className={classes.icon}
            style={{
              backgroundImage: `url(${neighborhood.imageUrl || placeholderImg})`,
            }}
          />
          <Typography variant="subtitle1" className={classes.caption}>
            {neighborhood.name}
          </Typography>
        </ButtonBase>
      );
    });
  }

  return (
    <section className={classes.container}>
      <div className={classes.titleBar}>
        <Typography variant="h6" className={classes.title}>
          Dates by Neighborhood
        </Typography>
        <Button onClick={() => store.set('focusedDate')(-1)}>
          <Typography variant="subtitle2">
            <strong>VIEW ALL</strong>
          </Typography>
        </Button>
      </div>
      {neighborhoods.length ? (
        <ScrollMenu
          alignOnResize={false}
          translate={1}
          data={renderNeighborhoods(classes)}
          wheel={false}
          onSelect={neighborhood => {
            addFilter(neighborhood);
          }}
        />
      ) : (
        <CircularProgress />
      )}
    </section>
  );
}

export default withStyles(styles)(NeighborhoodsRow);
