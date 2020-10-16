import React, { useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
// import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';
import Popover from 'react-popover';

import BeaconTitle from '../BeaconTitle/BeaconTitle';
import LoginButton from '../LoginButton/LoginButton';
import Paper from '../Paper/Paper';
import styles from './AppBar.module.css';

export default function BeaconAppBar() {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const popoverClick = () => {
    setPopoverOpen(true);
  };

  const popoverProps = {
    isOpen: isPopoverOpen,
    preferPlace: 'below',
    // place: this.state.place,
    onOuterAction: () => setPopoverOpen(false),
    body: [
      <Paper withShadow>
        <div className={styles.popover}>
          <h6>Sign up or log in</h6>
          <br />
          <div className={styles.loginButtonContainer}>
            <LoginButton type="google" />
          </div>
          <div className={styles.loginButtonContainer}>
            <LoginButton type="facebook" />
          </div>
        </div>
      </Paper>,
    ],
  };

  return (
    <AppBar position="static" className={styles.container}>
      <Toolbar className={styles.inner}>
        <span className={styles.beaconTitle}>
          <BeaconTitle responsive />
        </span>
        {isMobile ? (
          <></>
        ) : (
          <Popover {...popoverProps}>
            <button type="button" onClick={popoverClick} className={styles.loginButton}>
              Login
            </button>
          </Popover>
        )}
      </Toolbar>
    </AppBar>
  );
}
