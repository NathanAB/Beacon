import ReactGA from 'react-ga';
import React, { useEffect, useState } from 'react';

import Store from '../../store';
import { useDesktop, loadDates } from '../../utils';
import { addComment } from '../../api';
import styles from './CommentInput.module.css';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import LoginPopover from '../LoginPopover/LoginPopover';
import constants from '../../constants';

export default function CommentInput({ profilePic, dateId }) {
  const store = Store.useStore();
  const user = store.get('user');
  const isDesktop = useDesktop();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginPopoverOpen, setLoginPopoverOpen] = useState(false);

  const onInputChange = e => {
    setInputValue(e?.target?.value);
  };

  const clearLogin = () => {
    localStorage.removeItem(constants.LOCAL_STORAGE.PENDING_COMMENT);
    setLoginPopoverOpen(false);
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Login Panel',
    });
  };
  const onSubmit = async e => {
    e.preventDefault();

    ReactGA.event({
      category: 'Interaction',
      action: 'Click Post Comment',
    });

    if (!user) {
      localStorage.setItem(constants.LOCAL_STORAGE.PENDING_COMMENT, inputValue);
      ReactGA.event({
        category: 'Interaction',
        action: 'Open Login Panel',
      });
      if (isDesktop) {
        setLoginPopoverOpen(true);
      } else {
        store.set('isLoginDrawerOpen')(true);
      }
      return;
    }
    localStorage.removeItem(constants.LOCAL_STORAGE.PENDING_COMMENT);

    if (!inputValue) {
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
        placeholder="Add a comment..."
      />
      {user ? (
        <Button type="submit" disabled={!inputValue}>
          Comment
        </Button>
      ) : (
        <LoginPopover isOpen={isLoginPopoverOpen} onClose={clearLogin}>
          <Button type="submit">Comment</Button>{' '}
        </LoginPopover>
      )}
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
        placeholder="Add a comment..."
      ></textarea>
      <button className={styles.postButton} type="submit">
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
