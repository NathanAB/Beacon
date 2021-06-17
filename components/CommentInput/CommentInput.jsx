import ReactGA from 'react-ga';
import React, { useEffect, useState } from 'react';

import Store from '../../store';
import { useDesktop, loadDates } from '../../utils';
import { addComment } from '../../api';
import styles from './CommentInput.module.css';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import constants from '../../constants';

export default function CommentInput({ profilePic, dateId }) {
  const store = Store.useStore();
  const hasAccess = store.get('hasAccess');

  const isDesktop = useDesktop();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeholderText = hasAccess ? 'Add a comment...' : 'Log in to add a comment...';

  const onInputChange = e => {
    setInputValue(e?.target?.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    ReactGA.event({
      category: 'Interaction',
      action: 'Click Post Comment',
    });

    if (!hasAccess || !inputValue) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addComment({ dateId, content: inputValue });
      await loadDates(store);
      setInputValue('');
      ReactGA.event({
        category: 'Interaction',
        action: 'Posted Comment',
      });
    } catch (err) {
      console.error(err);
      window.alert('There was a problem submitting your comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const pendingComment = localStorage.getItem(constants.LOCAL_STORAGE.PENDING_COMMENT);
    if (pendingComment) {
      (async () => {
        try {
          document.getElementById('comments').scrollIntoView();
          setIsSubmitting(true);

          await addComment({ dateId, content: pendingComment });
          await loadDates(store);
          localStorage.removeItem(constants.LOCAL_STORAGE.PENDING_COMMENT);
          ReactGA.event({
            category: 'Interaction',
            action: 'Posted Comment',
          });
        } catch (err) {
          console.error(err);
        } finally {
          setIsSubmitting(false);
        }
      })();
    } else {
      localStorage.removeItem(constants.LOCAL_STORAGE.PENDING_COMMENT);
    }
  }, []);

  const content = isDesktop ? (
    <form onSubmit={onSubmit} className={styles.container}>
      {profilePic ? (
        <img className={styles.profilePic} src={profilePic} alt="You" />
      ) : (
        <div className={styles.profilePic} />
      )}
      <input
        className={styles.inputBox}
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholderText}
        disabled={!hasAccess}
      />
      <Button type="submit" disabled={!inputValue || !hasAccess}>
        Comment
      </Button>
    </form>
  ) : (
    <form onSubmit={onSubmit} className={styles.container}>
      {profilePic ? (
        <img className={styles.profilePic} src={profilePic} alt="You" />
      ) : (
        <div className={styles.profilePic} />
      )}
      <textarea
        className={styles.inputBox}
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholderText}
        disabled={!hasAccess}
      ></textarea>
      <button className={styles.postButton} type="submit" disabled={!hasAccess}>
        Post
      </button>
    </form>
  );

  return (
    <>
      {isSubmitting && <Spinner />}
      {content}
    </>
  );
}
