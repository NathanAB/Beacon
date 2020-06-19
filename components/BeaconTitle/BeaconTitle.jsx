import React from 'react';
import InternalLink from 'next/link';

import styles from './BeaconTitle.module.css';

export default function BeaconTitle() {
  return (
    <InternalLink href="/">
      <span className={styles.title}>BEACON</span>
    </InternalLink>
  );
}
