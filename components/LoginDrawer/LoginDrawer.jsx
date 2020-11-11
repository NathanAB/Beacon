import React from 'react';
import ReactGA from 'react-ga';
import Drawer from 'react-bottom-drawer';
import Image from 'next/image';

import Store from '../../store';
import LoginButton from '../LoginButton/LoginButton';

import styles from './LoginDrawer.module.css';

export default function LoginDrawer() {
  const store = Store.useStore();
  const isLoginDrawerOpen = store.get('isLoginDrawerOpen');
  const setLoginDrawerOpen = store.set('isLoginDrawerOpen');

  const onCloseDrawer = React.useCallback(() => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Login Panel',
    });
    setLoginDrawerOpen(false);
  }, []);

  return (
    <Drawer isVisible={isLoginDrawerOpen} onClose={onCloseDrawer}>
      <div className={styles.container}>
        <Image
          alt="Beacon Logo"
          src="/assets/graphics/beacon-gem.svg"
          className={styles.logo}
          unsized
        />
        <div>Log in to start saving dates</div>
        <br />
        <div className={styles.loginButtonContainer}>
          <LoginButton type="google" />
        </div>
        <div className={styles.loginButtonContainer}>
          <LoginButton type="facebook" />
        </div>
      </div>
    </Drawer>
  );
}
