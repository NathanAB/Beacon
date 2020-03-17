import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, IconButton, Icon, Typography, ButtonBase, CircularProgress } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';

import { useDesktop } from '../../../utils';
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
    paddingLeft: '20px',
    fontWeight: 600,
  },
  caption: {
    fontWeight: 600,
    whiteSpace: 'normal',
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: 'Raleway',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  loadingContainer: {
    textAlign: 'center',
  },
});

function NeighborhoodsRow({ classes }) {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');
  const isDesktop = useDesktop();

  function addFilter(neighborhood) {
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
        <div key={neighborhood.name} className={classes.neighborhood}>
          <InternalLink href="/search">
            <a>
              <div
                className={classes.icon}
                style={{
                  backgroundImage: `url(${neighborhood.imageUrl || placeholderImg})`,
                }}
              />
              <Typography variant="subtitle1" className={classes.caption}>
                {neighborhood.name}
              </Typography>
            </a>
          </InternalLink>
        </div>
      );
    });
  }

  return (
    <section className={classes.container}>
      <div className={classes.titleBar}>
        <Typography variant="h6" className={classes.title}>
          Dates by Neighborhood
        </Typography>
      </div>
      {neighborhoods.length ? (
        <ScrollMenu
          alignOnResize={false}
          translate={20}
          data={renderNeighborhoods(classes)}
          wheel={false}
          itemStyle={{
            paddingRight: '20px',
          }}
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
          onSelect={neighborhood => {
            addFilter(neighborhood);
          }}
        />
      ) : (
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      )}
    </section>
  );
}

export default withStyles(styles)(NeighborhoodsRow);