import React from 'react';
import Paper from '../Paper/Paper';

import dc3 from '../../assets/img/dc-3.jpeg';

import styles from './DateCardPreview.module.css';

export default function DateCardPreview({ dateObj, isNew }) {
  return (
    <div className={styles.cardContainer}>
      <Paper>
        <div className={styles.cardContent}>
          <div className={styles.newChip}>NEW</div>
          <img src={dc3} className={styles.thumbnail} alt="date" />
          <div className={styles.cardBody}>
            <h6>Night at the Virtual Museum</h6>
            <span>2 hours</span>
            <span>$</span>
          </div>
        </div>
      </Paper>
    </div>
  );
}
