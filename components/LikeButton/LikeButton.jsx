import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { Experiment, Variant } from 'react-optimize';
import { useMediaQuery } from 'react-responsive';
import { BsBookmark, BsBookmarkFill, BsStar, BsStarFill } from 'react-icons/bs';

import Store from '../../store';
import LoginPopover from '../LoginPopover/LoginPopover';
import Button from '../Button/Button';
import styles from './LikeButton.module.css';
import { unlikeDate, likeDate } from '../../api';
import HeartSelected from '../../assets/graphics/favorite-selected.svg';
import HeartUnselected from '../../assets/graphics/favorite-unselected.svg';

export default function LikeButton({ dateObj }) {
  const [isLoginPopoverOpen, setLoginPopoverOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const dateId = dateObj?.id?.toString();
  const dateName = dateObj?.name;
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
      <div>
        <Experiment id="5rqvHzHiTtisHQqfXXWZxA">
          <Variant id="0">
            <button className={styles.button} type="button" onClick={onClick}>
              <img
                src={HeartSelected}
                alt="Click to unsave date"
                className={`${styles.icon} ${styles.filledIcon} ${
                  isFavorite ? styles.visible : styles.hidden
                }`}
              />
              <img alt="Click to save date" src={HeartUnselected} className={styles.icon} />
            </button>
          </Variant>
          <Variant id="1">
            <button className={styles.button} type="button" onClick={onClick}>
              <BsBookmarkFill
                className={`${styles.icon} ${styles.filledIcon} ${
                  isFavorite ? styles.visible : styles.hidden
                }`}
              />
              <BsBookmark className={styles.icon} />
            </button>
          </Variant>
          <Variant id="2">
            <button className={styles.button} type="button" onClick={onClick}>
              <BsStarFill
                className={`${styles.icon} ${styles.filledIcon} ${
                  isFavorite ? styles.visible : styles.hidden
                }`}
              />
              <BsStar className={styles.icon} />
            </button>
          </Variant>
          <Variant id="3">
            <Button
              variant={isFavorite ? Button.VARIANTS.PRIMARY : Button.VARIANTS.OUTLINED}
              size={Button.SIZES.MICRO}
              onClick={onClick}
            >
              {isFavorite ? 'Saved ✓' : 'Save'}
            </Button>
          </Variant>
        </Experiment>
      </div>
    </LoginPopover>
  );
}
