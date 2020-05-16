import React from 'react';
import Paper from '../Paper/Paper';

import dc3 from '../../assets/img/dc-3.jpeg';

import styles from './DateCardPreview.module.css';
import { getDateCost, getDateLength } from '../../utils';
import Chip from '../Chip/Chip';

export default function DateCardPreview({ dateObj, isNew }) {
  const section1 = dateObj.sections[0];
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
  tags = tags.slice(0, 4);

  return (
    <div className={styles.cardContainer}>
      <Paper fullWidth>
        <div className={styles.cardContent}>
          {isNew && <div className={styles.newChip}>NEW</div>}
          <img src={imageUrl} className={styles.thumbnail} alt="date" />
          <div className={styles.cardBody}>
            <h6>{dateObj.name}</h6>
            <div className={styles.timeAndCost}>
              {getDateLength(dateObj)} hours · {getDateCost(dateObj)}
            </div>
            <div className={styles.tagsContainer}>
              {tags.map(tag => (
                <div className={styles.tag}>
                  <Chip>{tag.name}</Chip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
