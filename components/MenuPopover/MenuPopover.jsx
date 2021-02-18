import React from 'react';
import Popover from 'react-popover';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';

import Paper from '../Paper/Paper';
import constants from '../../constants';

import styles from './MenuPopover.module.css';

export default function MenuPopover({ user, isOpen, onClose, children }) {
  const popoverProps = {
    isOpen,
    preferPlace: 'below',
    onOuterAction: onClose,
    body: [
      <Paper withShadow>
        <div className={styles.popover}>
          <div className={styles.header}>
            <img alt="Your profile" src={user.picture} className={styles.profilePic} />
            <h6>{user.name}</h6>
          </div>
          <nav>
            <ul className={styles.navList}>
              <li>
                <InternalLink href="/profile">
                  <a onClick={onClose}>Your profile</a>
                </InternalLink>
              </li>
              <li>
                <InternalLink href="/saved">
                  <a onClick={onClose}>Saved dates</a>
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
          </nav>
        </div>
      </Paper>,
    ],
  };

  return <Popover {...popoverProps}>{children}</Popover>;
}
