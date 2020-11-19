import React from 'react';
import moment from 'moment';

import { useDesktop } from '../../utils';
import styles from './UserComment.module.css';
import Paper from '../Paper/Paper';

export default function UserComment({ userName, timestamp, comment, profilePic }) {
  const isDesktop = useDesktop();
  return isDesktop ? (
    <section className={styles.container}>
      <div className={styles.desktopInner}>
        <img className={styles.profilePic} src={profilePic} alt={userName} />
        <Paper fullWidth withShadow>
          <div className={styles.paperInner}>
            <div className={styles.header}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.timestamp}>| {moment(timestamp).fromNow()}</span>
            </div>
            <p className={styles.comment}>{comment}</p>
          </div>
        </Paper>
      </div>
    </section>
  ) : (
    <section className={styles.container}>
      <div className={styles.header}>
        <img className={styles.profilePic} src={profilePic} alt={userName} />
        <span className={styles.userName}>{userName}</span>
        <span className={styles.timestamp}>| {moment(timestamp).fromNow()}</span>
      </div>
      <p className={styles.comment}>{comment}</p>
    </section>
  );
}
