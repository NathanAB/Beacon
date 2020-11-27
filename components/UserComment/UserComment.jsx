import ReactGA from 'react-ga';
import React, { useState } from 'react';
import moment from 'moment';

import Store from '../../store';
import { useDesktop, loadDates } from '../../utils';
import styles from './UserComment.module.css';
import Paper from '../Paper/Paper';
import Button from '../Button/Button';
import { deleteComment } from '../../api';

import Spinner from '../Spinner/Spinner';

export default function UserComment({
  userName,
  isOwner,
  timestamp,
  content,
  commentId,
  profilePic,
}) {
  const store = Store.useStore();
  const isDesktop = useDesktop();
  const [isDeleting, setIsDeleting] = useState(false);

  // Dates in db are UTC - attempt to convert to local timezone
  const time = moment(timestamp).fromNow();

  const onDelete = async () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Delete Comment',
    });
    if (!window.confirm('Are you sure you want to delete your comment?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteComment(commentId);
      await loadDates(store);
      ReactGA.event({
        category: 'Interaction',
        action: 'Deleted Comment',
      });
    } catch (err) {
      window.alert("Something went wrong and we weren't able to delete your comment");
    } finally {
      setIsDeleting(false);
    }
  };

  return isDesktop ? (
    <section className={styles.container}>
      <div className={styles.desktopInner}>
        <img className={styles.profilePic} src={profilePic} alt={userName} />
        <Paper fullWidth withShadow>
          <div className={styles.paperInner}>
            <div className={styles.header}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.timestamp}>| {time}</span>
            </div>
            <p className={styles.comment}>{content}</p>
            {isOwner &&
              (isDeleting ? (
                <Spinner />
              ) : (
                <Button
                  onClick={onDelete}
                  variant={Button.VARIANTS.BORDERLESS}
                  size={Button.SIZES.MICRO}
                >
                  Delete
                </Button>
              ))}
          </div>
        </Paper>
      </div>
    </section>
  ) : (
    <section className={styles.container}>
      <div className={styles.header}>
        <img className={styles.profilePic} src={profilePic} alt={userName} />
        <span className={styles.userName}>{userName}</span>
        <span className={styles.timestamp}>| {time}</span>
      </div>
      <p className={styles.comment}>{content}</p>
      {isOwner &&
        (isDeleting ? (
          <Spinner />
        ) : (
          <Button onClick={onDelete} variant={Button.VARIANTS.BORDERLESS} size={Button.SIZES.MICRO}>
            Delete
          </Button>
        ))}
    </section>
  );
}
