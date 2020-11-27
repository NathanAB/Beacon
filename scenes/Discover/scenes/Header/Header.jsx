import React, { useState } from 'react';
import InternalLink from 'next/link';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

import { filterArrayToString, filterDates } from '../../../../utils';
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
  const dates = store.get('dates');
  const router = useRouter();

  const [tagVals, setTagVals] = useState([]);
  const tagSelect = e => {
    if (e) {
      ReactGA.event({
        category: 'Interaction',
        action: 'Select Vibe',
        label: e && e[e.length - 1]?.label,
      });
    }
    setTagVals(e || []);
  };

  const [neighborhoodVals, setNeighborhoodVals] = useState([]);
  const neighborhoodSelect = e => {
    if (e) {
      ReactGA.event({
        category: 'Interaction',
        action: 'Select Neighborhood',
        label: e && e[e.length - 1]?.label,
      });
    }
    setNeighborhoodVals(e || []);
  };

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

  const neighborhoodOptions = neighborhoods
    .filter(
      neighborhood =>
        filterDates(dates, [...filters, { type: 'neighborhood', value: neighborhood.name }]).length,
    )
    .map(neighborhood => ({
      value: neighborhood.name,
      label: neighborhood.name,
    }));
  const tagOptions = tags
    .filter(tag => filterDates(dates, [...filters, { type: 'tag', value: tag.name }]).length)
    .map(tag => ({
      value: tag.name,
      label: tag.name,
    }));

  const headerOriginal = (
    <>
      <div className={styles.cardSection}>
        <h5>Neighborhood in DC</h5>
        <Select
          values={neighborhoodVals}
          onChange={neighborhoodSelect}
          isMulti
          options={neighborhoodOptions}
        />
      </div>
      <div className={styles.cardSection}>
        <h5>Vibe</h5>
        <Select values={tagVals} onChange={tagSelect} isMulti options={tagOptions} />
      </div>
      <InternalLink
        href={{ pathname: '/search', query: { filters: filterArrayToString(filters) } }}
      >
        <a
          onClick={() => {
            store.set('lastFilters')(filters);
            ReactGA.event({
              category: 'Interaction',
              action: 'Click Search Dates',
            });
          }}
        >
          <Button size={Button.SIZES.LARGE} variant={Button.VARIANTS.PRIMARY}>
            Search dates
          </Button>
        </a>
      </InternalLink>
    </>
  );

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
          <h1>Date night in DC?</h1>
          <h4 className={styles.subtitle}>
            We&apos;ve got you <br /> covered with fun <br /> & fresh date ideas.
          </h4>
        </div>
        <div>
          <div className={styles.cardContainer}>
            <Paper withShadow noMobile>
              <div className={styles.cardBody}>{headerOriginal}</div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
