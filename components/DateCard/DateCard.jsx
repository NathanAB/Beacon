import React, { useState } from 'react';
import { useRouter } from 'next/router';

// TODO: Enable favoriting
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Paper from '../Paper/Paper';
import placeholder1 from '../../assets/graphics/pattern-1.svg';
import placeholder2 from '../../assets/graphics/pattern-2.svg';
import placeholder3 from '../../assets/graphics/pattern-3.svg';
import placeholder4 from '../../assets/graphics/pattern-4.svg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength, getSectionImage, getDateTags } from '../../utils';
import Chip from '../Chip/Chip';
import ShareButton from '../ShareButton/ShareButton';
import Constants from '../../constants';

const placeholderImgs = [placeholder1, placeholder2, placeholder3, placeholder4];

const randPlaceholder = () => placeholderImgs[Math.floor(Math.random() * Math.floor(4))];

export default function DateCard({ dateObj, variant = DateCard.VARIANTS.PREVIEW, isFavorite }) {
  const router = useRouter();
  const section1 = dateObj.sections[0];
  const isFull = variant === DateCard.VARIANTS.FULL;
  const dateLength = getDateLength(dateObj);
  const isNew = dateObj.new;
  const imageUrl = getSectionImage(section1);
  const tags = getDateTags(dateObj);
  const dateUrl = `https://${window.location.host}${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`;
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [placeholder] = useState(randPlaceholder());

  const openDateDetails = () => {
    router
      .push(`${Constants.PAGES.DATE_DETAILS}/[dateId]`, {
        pathname: `${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`,
      })
      .then(() => window.scrollTo(0, 0));
  };

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
              className={styles.thumbnail}
              type="button"
              onClick={() => openDateDetails()}
              alt="date"
            >
              <img
                alt=""
                className={styles.thumbnailImage}
                onLoad={() => {
                  setHighResLoaded(true);
                }}
                src={imageUrl}
              />
              <img
                className={cn(
                  styles.thumbnailImage,
                  styles.thumbnailPlaceholder,
                  highResLoaded && styles.thumbnailPlaceholderClear,
                )}
                alt=""
                src={placeholder}
              />
            </button>
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
                  <ShareButton dateObj={dateObj} url={dateUrl} />
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
