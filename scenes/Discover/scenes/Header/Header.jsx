import React, { useState } from 'react';
import InternalLink from 'next/link';

import { filterArrayToString } from '../../../../utils';
import Button from '../../../../components/Button/Button';
import Paper from '../../../../components/Paper/Paper';
import Select from '../../../../components/Select/Select';
import blobOrange from '../../../../assets/graphics/pink-blob.png';
import couple1 from '../../../../assets/graphics/blob-1.png';
import couple2 from '../../../../assets/graphics/blob-2.png';
import BeaconTitle from '../../../../components/BeaconTitle/BeaconTitle';
import Store from '../../../../store';

import styles from './Header.module.css';

export default function Header() {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');
  const tags = store.get('tags');
  const [neighborhoodVals, setNeighborhoodVals] = useState([]);
  const [tagVals, setTagVals] = useState([]);
  const filters = [
    ...tagVals.map(t => ({
      ...t,
      type: 'tag',
    })),
    ...neighborhoodVals.map(n => ({
      ...n,
      type: 'neighborhood',
    })),
  ];

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
        <img src={couple2} className={styles.couple2} alt="A couple laughing." />
      </div>
      <div className={styles.headerContent}>
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
            <Paper withShadow noMobile>
              <div className={styles.cardBody}>
                <div className={styles.cardSection}>
                  <h5>Neighborhood</h5>
                  <Select
                    values={neighborhoodVals}
                    onChange={setNeighborhoodVals}
                    isMulti
                    options={neighborhoodOptions}
                  />
                </div>
                <div className={styles.cardSection}>
                  <h5>Vibe</h5>
                  <Select values={tagVals} onChange={setTagVals} isMulti options={tagOptions} />
                </div>
                <InternalLink
                  href={{ pathname: '/search', query: { filters: filterArrayToString(filters) } }}
                >
                  <a>
                    <Button size={Button.SIZES.LARGE} variant={Button.VARIANTS.PRIMARY}>
                      Search dates
                    </Button>
                  </a>
                </InternalLink>
              </div>
            </Paper>
          </div>
          {/* Disabled for now - we don't want to push login yet
           <div className={styles.cardContainer}>
            <Paper transparent withShadow noMobile>
              <div className={styles.cardBody}>
                <h6 className={styles.login}>
                  <a>Login</a> to peep your saved dates (and add new ones!)
                </h6>
              </div>
            </Paper>
          </div> */}
        </div>
      </div>
    </>
  );
}
