import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import Store from '../../store';
import LoginPopover from '../LoginPopover/LoginPopover';
import styles from './LikeButton.module.css';
import { unlikeDate, likeDate } from '../../api';

export default function LikeButton({ dateObj }) {
  const [isLoginPopoverOpen, setLoginPopoverOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const dateId = dateObj.id.toString();
  const dateName = dateObj.name;
  const store = Store.useStore();
  const likedDates = store.get('likedDates');
  const user = store.get('user');
  const isFavorite = likedDates.includes(dateId);

  const closeLogin = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Login Panel',
    });
    setLoginPopoverOpen(false);
  };

  const onClick = () => {
    ReactGA.event({
      category: 'Interaction',
      action: isFavorite ? 'Unliked Date' : 'Liked Date',
      label: dateName,
    });
    let newLikedDates = [...likedDates];
    if (!user) {
      if (isMobile) {
        store.set('isLoginDrawerOpen')(true);
      } else if (isLoginPopoverOpen) {
        closeLogin();
      } else {
        ReactGA.event({
          category: 'Interaction',
          action: 'Open Login Panel',
        });
        setLoginPopoverOpen(true);
      }
    }

    if (isFavorite) {
      newLikedDates = newLikedDates.filter(currDateId => currDateId !== dateId);
      if (user) {
        unlikeDate(dateId);
      }
    } else {
      newLikedDates.push(dateId);
      if (user) {
        likeDate(dateId);
      }
    }

    store.set('likedDates')(newLikedDates);
    if (!user) {
      localStorage.setItem('likedDates', JSON.stringify(newLikedDates));
    }
  };

  return (
    <LoginPopover isOpen={isLoginPopoverOpen} onClose={closeLogin}>
      <button className={styles.button} type="button" onClick={onClick}>
        <AiFillHeart
          className={`${styles.icon} ${styles.filledIcon} ${
            isFavorite ? styles.visible : styles.hidden
          }`}
        />
        <AiOutlineHeart className={styles.icon} />
      </button>
    </LoginPopover>
  );
}
