import React from 'react';
import ReactGA from 'react-ga';
import Drawer from 'react-bottom-drawer';

import Store from '../../store';
import LoginButton from '../LoginButton/LoginButton';
import BeaconGem from '../../assets/graphics/beacon-gem.svg';

import styles from './LoginDrawer.module.css';

export default function LoginDrawer() {
  const store = Store.useStore();
  const isLoginDrawerOpen = store.get('isLoginDrawerOpen');
  const setLoginDrawerOpen = store.set('isLoginDrawerOpen');

  const onCloseDrawer = React.useCallback(() => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Clos Login Panel',
    });
    setLoginDrawerOpen(false);
  }, []);

  return (
    <Drawer isVisible={isLoginDrawerOpen} onClose={onCloseDrawer}>
      <div className={styles.container}>
        <img alt="Beacon Logo" src={BeaconGem} className={styles.logo} />
        <div>Log in with an existing account</div>
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
