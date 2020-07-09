import React from 'react';
import { uniqBy } from 'lodash';

// TODO: Enable favoriting
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Paper from '../Paper/Paper';
import dc3 from '../../assets/img/dc-3.jpeg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength, createCalendarEvent } from '../../utils';
import Chip from '../Chip/Chip';
import ShareButton from './components/ShareButton/ShareButton';

export default function DateCard({ dateObj, variant = DateCard.VARIANTS.PREVIEW, isFavorite }) {
  const section1 = dateObj.sections[0];
  const isFull = variant === DateCard.VARIANTS.FULL;
  const dateLength = getDateLength(dateObj);
  const isNew = dateObj.new;
  let imageUrl;

  const calendarEvent = createCalendarEvent(dateObj);

  if (section1.image) {
    imageUrl = section1.image.includes('http')
      ? section1.image // Use raw image URL
      : `https://instagram.com/p/${section1.image}/media/?size=m`; // Imply image url from Instagram ID
  } else {
    // Use placeholder
    imageUrl = dc3;
  }

  let tags = [];
  dateObj.sections.forEach(section => {
    tags.push(...section.tags);
  });
  tags = uniqBy(tags, tag => tag.tagId);
  tags = tags.slice(0, 3);

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.cardContainer,
          isFull ? styles.fullDateCard : '',
          isFavorite ? styles.favorite : '',
        )}
      >
        <Paper fullWidth highlighted={isFavorite} noBorder>
          <div className={styles.cardContent}>
            <div
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${imageUrl}), url(${dc3})` }}
              alt="date"
            />
            <div className={styles.cardBody}>
              <h6>{dateObj.name}</h6>
              <div className={styles.timeAndCost}>
                {dateLength} hours · {getDateCost(dateObj)}
              </div>
              <div className={styles.tagsContainer}>
                {tags.map(tag => (
                  <div key={tag.tagId} className={styles.tag}>
                    <Chip>{tag.name}</Chip>
                  </div>
                ))}
              </div>
              {isFull && <p className={styles.description}>{dateObj.description}</p>}
              {isNew && <div className={styles.newChip}>NEW</div>}
              {isFull && (
                <div className={styles.cardButtons}>
                  <ShareButton event={calendarEvent} />
                  {/* TODO: Enable favoriting */}
                  {/* <button type="button" className={styles.favoriteButton} onClick={() => {}}>
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button> */}
                </div>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

DateCard.VARIANTS = {
  PREVIEW: 'preview',
  FULL: 'full',
};
