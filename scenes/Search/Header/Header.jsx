import React from 'react';
import styles from './Header.module.css';

import BeaconTitle from '../../../components/BeaconTitle/BeaconTitle';

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <BeaconTitle />
        <h6>
          <a>Login</a> to your account
        </h6>
      </div>
      <h2>Explore Dates</h2>
    </>
  );
}
