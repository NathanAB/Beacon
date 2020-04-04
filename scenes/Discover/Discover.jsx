import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';
import FilterBar from '../FilterBar/FilterBar';
import NeighborhoodsRow from './NeighborhoodsRow/NeighborhoodsRow';
import DatesRow from './DatesRow/DatesRow';
import TagsRow from '../../components/TagsRow/TagsRow';
import HeroImage from '../../assets/img/dc-3.jpeg';

const styles = () => ({
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    padding: '0px 20px',
  },
  title: {
    fontWeight: 600,
  },
  hero: {
    top: '0px',
    height: '370px',
    left: '0px',
    right: '0px',
    display: 'flex',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      top: '0px',
      height: '440px',
      position: 'absolute',
      left: '0px',
      right: '0px',
      // background: `linear-gradient(to bottom, rgba(186,48,13,0.5) 0%, rgba(186,48,13,0.5) 100%), url(${HeroImage})`,
      background: `linear-gradient(to bottom, rgba(186,48,13,0.2) 0%, rgba(186,48,13,0.2) 100%), url(${HeroImage})`,
      // background: `url(${HeroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    },
  },
  heroContent: {
    width: '100%',
    maxWidth: '1050px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: '20px',
  },
  heroTitle: {
    zIndex: 2,
    fontWeight: 600,
    lineHeight: '64px',
  },
  spacer: {
    height: '350px',
  },
});

function Discover({ classes }) {
  const store = Store.useStore();
  useEffect(() => {
    store.set('focusedDate')(false);
  }, []);

  return (
    <Box>
      <Box className={classes.hero}>
        <Box className={classes.heroContent}>
          <Typography color="secondary" align="center" variant="h3" className={classes.heroTitle}>
            Date night at home? <br /> We&apos;ve got you covered
          </Typography>
          <FilterBar isStatic />
        </Box>
      </Box>
      <DatesRow />
      <NeighborhoodsRow />

      <Box className={classes.tagsContainer}>
        <Typography variant="h6" className={classes.title}>
          Dates by Characteristic
        </Typography>
        <TagsRow isDiscover />
      </Box>
    </Box>
  );
}

export default withStyles(styles)(Discover);
