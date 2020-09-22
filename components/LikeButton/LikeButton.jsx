import React from 'react';
import ReactGA from 'react-ga';

import Store from '../../store';
import HeartSelected from '../../assets/graphics/favorite-selected.svg';
import HeartUnselected from '../../assets/graphics/favorite-unselected.svg';
import styles from './LikeButton.module.css';

export default function LikeButton({ dateObj }) {
  const dateId = dateObj.id.toString();
  const dateName = dateObj.name;
  const store = Store.useStore();
  const likedDates = store.get('likedDates');
  const isFavorite = likedDates.includes(dateId);

  const onClick = () => {
    let newLikedDates = [...likedDates];
    if (isFavorite) {
      newLikedDates = newLikedDates.filter(currDateId => currDateId !== dateId);
    } else {
      newLikedDates.push(dateId);
    }
    ReactGA.event({
      category: 'Interaction',
      action: isFavorite ? 'Unliked Date' : 'Liked Date',
      label: dateName,
    });
    localStorage.setItem('likedDates', JSON.stringify(newLikedDates));
    store.set('likedDates')(newLikedDates);
  };

  // return <Heart isClick={isFavorite} onClick={onClick} />;

  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <img
        alt="Filled heart icon"
        className={`${styles.icon} ${styles.filledIcon} ${
          isFavorite ? styles.visible : styles.hidden
        }`}
        src={HeartSelected}
      />
      <img alt="Outlined heart icon" className={styles.icon} src={HeartUnselected} />
    </button>
  );
}
