import React from 'react';
import ReactGA from 'react-ga';
import { Drawer, Icon } from '@material-ui/core';

import styles from './ProfileDrawer.module.css';
import constants from '../../constants';

export default function ProfileDrawer({ isOpen, onClose, user }) {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.closeButton} type="button" onClick={onClose}>
            <Icon>chevron_left</Icon>
            <span>Account</span>
          </button>
        </div>
        <div className={styles.user}>
          <img alt="You" src={user.picture} className={styles.profilePic} />
          <span>{user.name}</span>
        </div>
        <div className={styles.lists}>
          {/* <ul className={styles.list}>
            </ul> */}
          {/* <hr className={styles.listDivider}/> */}
          <ul className={styles.list}>
            <li>
              <ReactGA.OutboundLink to={constants.API.LOGOUT} eventLabel="Logout">
                Log out
              </ReactGA.OutboundLink>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
}
