import React from 'react';

import { useDesktop } from '../../utils';
import styles from './CommentInput.module.css';
import Button from '../Button/Button';

export default function CommentInput({ profilePic }) {
  const isDesktop = useDesktop();
  return isDesktop ? (
    <section className={styles.container}>
      {profilePic ? (
        <img className={styles.profilePic} src={profilePic} alt="You" />
      ) : (
        <div className={styles.profilePic} />
      )}
      <input className={styles.inputBox} />
      <Button>Comment</Button>
    </section>
  ) : (
    <section className={styles.container}>
      {profilePic ? (
        <img className={styles.profilePic} src={profilePic} alt="You" />
      ) : (
        <div className={styles.profilePic} />
      )}
      <textarea className={styles.inputBox}></textarea>
      <button className={styles.postButton} type="button">
        Post
      </button>
    </section>
  );
}
