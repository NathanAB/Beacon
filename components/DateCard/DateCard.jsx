import React from 'react';
import { uniqBy } from 'lodash';
import { useRouter } from 'next/router';

// TODO: Enable favoriting
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Paper from '../Paper/Paper';
import dc3 from '../../assets/img/dc-3.jpeg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength, createCalendarEvent, getSectionImage } from '../../utils';
import Chip from '../Chip/Chip';
import ShareButton from './components/ShareButton/ShareButton';
import Constants from '../../constants';

export default function DateCard({ dateObj, variant = DateCard.VARIANTS.PREVIEW, isFavorite }) {
  const router = useRouter();
  const section1 = dateObj.sections[0];
  const isFull = variant === DateCard.VARIANTS.FULL;
  const dateLength = getDateLength(dateObj);
  const isNew = dateObj.new;
  const imageUrl = getSectionImage(section1);

  const calendarEvent = createCalendarEvent(dateObj);

  const openDateDetails = () => {
    router
      .push(`${Constants.PAGES.DATE_DETAILS}/[dateId]`, {
        pathname: `${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`,
      })
      .then(() => window.scrollTo(0, 0));
  };

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
            <button
              type="button"
              onClick={() => openDateDetails()}
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${imageUrl}), url(${dc3})` }}
              alt="date"
            />
            <div className={styles.cardBody}>
              <button className={styles.clickable} type="button" onClick={() => openDateDetails()}>
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
              </button>

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
