import React from 'react';
import { Box } from '@material-ui/core';

import Button from '../../../../components/Button/Button';
import Paper from '../../../../components/Paper/Paper';
import Select from '../../../../components/Select/Select';
import blobOrange from '../../../../assets/graphics/blob-orange.png';
import couple1 from '../../../../assets/graphics/couple-1.png';
import BeaconTitle from '../../../../components/BeaconTitle/BeaconTitle';
import Store from '../../../../store';

import styles from './Header.module.css';

export default function Header() {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');
  const tags = store.get('tags');

  const neighborhoodOptions = neighborhoods.map(neighborhood => ({
    value: neighborhood.name,
    label: neighborhood.name,
  }));
  const tagOptions = tags.map(tag => ({
    value: tag.name,
    label: tag.name,
  }));

  return (
    <>
      <div className={styles.backgroundImages}>
        <img src={blobOrange} className={styles.blobOrange} alt="A blob of orange color." />
        <img src={couple1} className={styles.couple1} alt="A couple with their backs turned." />
      </div>
      <Box
        display="flex"
        flexWrap="wrap"
        margin="20px"
        justifyContent="space-around"
        alignItems="center"
        position="relative"
        marginBottom="100px"
      >
        <div className={styles.title}>
          <div className={styles.beaconTitle}>
            <BeaconTitle />
          </div>
          <h1>Date night at home?</h1>
          <h4 className={styles.subtitle}>
            We&apos;ve got you <br /> covered with fun <br /> & fresh date ideas.
          </h4>
        </div>
        <div>
          <div className={styles.cardContainer}>
            <Paper withShadow>
              <div className={styles.cardBody}>
                <div className={styles.cardSection}>
                  <h5>Neighborhood</h5>
                  <Select isMulti options={neighborhoodOptions} />
                </div>
                <div className={styles.cardSection}>
                  <h5>Vibe</h5>
                  <Select isMulti options={tagOptions} />
                </div>
                <Button size={Button.SIZES.LARGE} variant={Button.VARIANTS.PRIMARY}>
                  Search dates
                </Button>
              </div>
            </Paper>
          </div>
          <div className={styles.cardContainer}>
            <Paper transparent withShadow>
              <div className={styles.cardBody}>
                <h6>
                  <a>Login</a> to peep your saved dates (and add new ones!)
                </h6>
              </div>
            </Paper>
          </div>
        </div>
      </Box>
    </>
  );
}
