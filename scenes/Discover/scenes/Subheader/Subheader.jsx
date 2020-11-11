import React from 'react';
import Image from 'next/image';

import styles from './Subheader.module.css';

const couple2 = '/assets/graphics/blob-3.png';
const yellowBlob = '/assets/graphics/yellow-blob.png';

export default function Subheader() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          width="700px"
          height="500px"
          src={yellowBlob}
          className={styles.yellowBlob}
          alt="A yellow blob."
        />
        <Image
          width="594px"
          height="500px"
          src={couple2}
          className={styles.couple}
          alt="A couple relaxing in bed with coffee."
        />
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
