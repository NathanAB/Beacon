import React, { useState } from 'react';
import { AppBar, Toolbar, Icon, Drawer } from '@material-ui/core';
// import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';
import Store from '../../store';

import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import BeaconTitle from '../BeaconTitle/BeaconTitle';
import LoginPopover from '../LoginPopover/LoginPopover';
import styles from './AppBar.module.css';

export default function BeaconAppBar() {
  const store = Store.useStore();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const setLoginDrawerOpen = store.set('isLoginDrawerOpen');
  const user = store.get('user');
  const isLoggedIn = !!user;

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const openLoginDrawer = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Open Login Panel',
    });
    setLoginDrawerOpen(true);
  };

  const openPopover = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Open Login Panel',
    });
    setPopoverOpen(true);
  };

  const closePopover = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Login Panel',
    });
    setPopoverOpen(false);
  };

  const openProfileMenu = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Open Profile Menu',
    });
    setProfileMenuOpen(true);
  };

  const closeProfileMenu = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Profile Menu',
    });
    setProfileMenuOpen(false);
  };

  const renderLogin = () => {
    return isMobile ? (
      <button type="button" onClick={openLoginDrawer} className={styles.loginButton}>
        <Icon color="primary">account_circle</Icon>
      </button>
    ) : (
      <LoginPopover isOpen={isPopoverOpen} onClose={closePopover}>
        <button type="button" onClick={openPopover} className={styles.loginButton}>
          Login
        </button>
      </LoginPopover>
    );
  };

  const renderUser = () => {
    return (
      <button type="button" onClick={openProfileMenu} className={styles.loginButton}>
        <img alt="Your profile" src={user.picture} className={styles.profilePic} />
      </button>
    );
  };

  return (
    <>
      <AppBar position="static" className={styles.container}>
        <Toolbar className={styles.inner}>
          <span className={styles.beaconTitle}>
            <BeaconTitle responsive />
          </span>
          {isLoggedIn ? renderUser() : renderLogin()}
        </Toolbar>
      </AppBar>
      <ProfileDrawer user={user} isOpen={isProfileMenuOpen} onClose={closeProfileMenu} />
    </>
  );
}
