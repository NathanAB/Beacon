import React, { useState } from 'react';
import { AppBar, Toolbar, Icon } from '@material-ui/core';
import Image from 'next/image';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';
import Store from '../../store';

import MenuDrawer from '../MenuDrawer/MenuDrawer';
import BeaconTitle from '../BeaconTitle/BeaconTitle';
import LoginPopover from '../LoginPopover/LoginPopover';
import LoginDrawer from '../LoginDrawer/LoginDrawer';
import styles from './AppBar.module.css';
import MenuPopover from '../MenuPopover/MenuPopover';

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
  const togglePopover = () => {
    if (isPopoverOpen) {
      closePopover();
    } else {
      openPopover();
    }
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
  const toggleProfileMenu = () => {
    if (isProfileMenuOpen) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  };

  const renderLogin = () => {
    return isMobile ? (
      <button type="button" onClick={openLoginDrawer} className={styles.loginButton}>
        <Icon color="primary">account_circle</Icon>
      </button>
    ) : (
      <LoginPopover isOpen={isPopoverOpen} onClose={closePopover}>
        <button type="button" onClick={togglePopover} className={styles.loginButton}>
          Login
        </button>
      </LoginPopover>
    );
  };

  const renderUser = () => {
    return isMobile ? (
      <button type="button" onClick={openProfileMenu} className={styles.loginButton}>
        <Image
          alt="Your profile"
          src={user.picture}
          className={styles.profilePic}
          width="32px"
          height="32px"
        />
      </button>
    ) : (
      <MenuPopover isOpen={isProfileMenuOpen} onClose={closeProfileMenu} user={user}>
        <button type="button" onClick={toggleProfileMenu} className={styles.loginButton}>
          <Image
            alt="Your profile"
            src={user.picture}
            className={styles.profilePic}
            width="32px"
            height="32px"
          />
          <span className={styles.hello}>Hi, {user.given_name}</span>
          <Icon>expand_more</Icon>
        </button>
      </MenuPopover>
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
      {isMobile && <MenuDrawer user={user} isOpen={isProfileMenuOpen} onClose={closeProfileMenu} />}
      {isMobile && <LoginDrawer />}
    </>
  );
}
