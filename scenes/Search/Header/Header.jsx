import React from 'react';

import styles from './Header.module.css';

import BeaconTitle from '../../../components/BeaconTitle/BeaconTitle';

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <BeaconTitle />
        {/* TODO: Enable login */}
        {/*  <h6><a>Login</a></h6> to your account */}
      </div>
      <h2>Explore Dates</h2>
    </>
  );
}
