import React from 'react';
import ReactGA from 'react-ga';
import Heart from '../Heart/Heart';

import Store from '../../store';

export default function LikeButton({ dateObj }) {
  const dateId = dateObj.id;
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
    localStorage.setItem('likedDates', newLikedDates);
    store.set('likedDates')(newLikedDates);
  };

  return <Heart isClick={isFavorite} onClick={onClick} />;
}
