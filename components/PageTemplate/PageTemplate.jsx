import React from 'react';
import styles from './PageTemplate.module.css';

import BeaconTitle from '../BeaconTitle/BeaconTitle';

export default function PageTemplate({ children }) {
  return (
    <div className={styles.container}>
      <BeaconTitle />
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
}
