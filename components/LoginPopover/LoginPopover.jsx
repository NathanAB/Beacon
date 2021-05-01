import React from 'react';
import Popover from 'react-popover';

import LoginButton from '../LoginButton/LoginButton';
import Paper from '../Paper/Paper';

import styles from './LoginPopover.module.css';

export default function LoginPopover({ children, isOpen, onClose }) {
  const popoverProps = {
    isOpen,
    preferPlace: 'below',
    onOuterAction: onClose,
    body: [
      <Paper withShadow>
        <div className={styles.popover}>
          <h6 className="text-lg font-bold">Log in to start saving dates</h6>
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

  return <Popover {...popoverProps}>{children}</Popover>;
}
