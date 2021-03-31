import React from 'react';
import ReactGA from 'react-ga';
import { Drawer, Icon } from '@material-ui/core';
import InternalLink from 'next/link';

import styles from './MenuDrawer.module.css';
import constants from '../../constants';

export default function MenuDrawer({ isOpen, onClose, user }) {
  const clickSaved = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Clicked Saved Dates',
    });
    onClose();
  };

  const isAdmin = user && constants.ADMINS.includes(user.email);

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
          <ul className={styles.list}>
            {isAdmin && (
              <li>
                <InternalLink href="/admin">
                  <a onClick={onClose}>Admin</a>
                </InternalLink>
              </li>
            )}
            {user?.dataValues?.isCreator && (
              <li>
                <InternalLink href="/profile">
                  <a onClick={onClose}>Your profile</a>
                </InternalLink>
              </li>
            )}
            <li>
              <InternalLink href="/saved">
                <a onClick={clickSaved}>Saved dates</a>
              </InternalLink>
            </li>
            <li>
              <ReactGA.OutboundLink
                to="https://forms.gle/ebaqVd2TMTw47RjW8"
                target="_blank"
                rel="noopener noreferrer"
                eventLabel="Feedback form"
              >
                Feedback
              </ReactGA.OutboundLink>
            </li>
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
