import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { uniqBy } from 'lodash';

import Paper from '../Paper/Paper';
import dc3 from '../../assets/img/dc-3.jpeg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength } from '../../utils';
import Chip from '../Chip/Chip';

export default function DateCard({
  dateObj,
  isNew,
  variant = DateCard.VARIANTS.PREVIEW,
  isFavorite = !!Math.round(Math.random()),
}) {
  const section1 = dateObj.sections[0];
  const isFull = variant === DateCard.VARIANTS.FULL;
  let imageUrl;

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
      <button
        type="button"
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
                {getDateLength(dateObj)} hours · {getDateCost(dateObj)}
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
            </div>
          </div>
        </Paper>
      </button>
      {isFull && (
        <div className={styles.cardButtons}>
          <a onClick={() => {}}>Share</a>
          <button type="button" className={styles.favoriteButton} onClick={() => {}}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      )}
    </div>
  );
}

DateCard.VARIANTS = {
  PREVIEW: 'preview',
  FULL: 'full',
};
