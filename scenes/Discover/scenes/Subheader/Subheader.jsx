import React from 'react';

import couple2 from '../../../../assets/graphics/blob-3.png';
import yellowBlob from '../../../../assets/graphics/yellow-blob.png';
import styles from './Subheader.module.css';

export default function Subheader() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={couple2} className={styles.couple} alt="A couple relaxing in bed with coffee." />
        <img src={yellowBlob} className={styles.yellowBlob} alt="A yellow blob." />
      </div>
      <div className={styles.textContainer}>
        <h3>
          People-sourced
          <br />& recommended
        </h3>
        <h5 className={styles.caption}>
          Our dates are sourced and curated by the people who know best — DC locals. We’re
          constantly updating with a steady flow of new dates to make sure there are always fun and
          fresh ideas at your fingertips.
        </h5>
      </div>
    </div>
  );
}
