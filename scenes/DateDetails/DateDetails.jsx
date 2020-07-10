import React from 'react';
import InternalLink from 'next/link';

import styles from './DateDetails.module.css';
import BeaconTitle from '../../components/BeaconTitle/BeaconTitle';
import Spinner from '../../components/Spinner/Spinner';
import Chip from '../../components/Chip/Chip';
import Store from '../../store';
import constants from '../../constants';
import { getSectionImage } from '../../utils';
import dc3 from '../../assets/img/dc-3.jpeg';

const DateDetails = ({ dateId, dateObj }) => {
  const store = Store.useStore();

  if (!dateObj) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <BeaconTitle />
      <div className={styles.backButton}>
        <InternalLink href={constants.PAGES.SEARCH}>
          <a>← Back to Explore</a>
        </InternalLink>
      </div>
      <h3 className={styles.dateTitle}>
        {dateObj.name}{' '}
        {dateObj.new && (
          <span className={styles.newTag}>
            <Chip variant={Chip.VARIANTS.PRIMARY}>NEW</Chip>
          </span>
        )}
      </h3>
      <div className={styles.thumbnailContainer}>
        {dateObj.sections.map(section => (
          <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url(${getSectionImage(section)}), url(${dc3})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default DateDetails;
