import React, { useState } from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';

import Paper from '../Paper/Paper';
import Button from '../Button/Button';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';

import placeholder1 from '../../assets/graphics/pattern-1.svg';
import placeholder2 from '../../assets/graphics/pattern-2.svg';
import placeholder3 from '../../assets/graphics/pattern-3.svg';
import placeholder4 from '../../assets/graphics/pattern-4.svg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength, getDateTags, useThumbnail } from '../../utils';
import Chip from '../Chip/Chip';
import Constants from '../../constants';

const placeholderImgs = [placeholder1, placeholder2, placeholder3, placeholder4];

const randPlaceholder = () => placeholderImgs[Math.floor(Math.random() * Math.floor(4))];

export default function DateCard({ dateObj, variant = DateCard.VARIANTS.PREVIEW, isFavorite }) {
  const section1 = dateObj.sections[0];
  const imageUrl = useThumbnail(section1);
  const isFull = variant === DateCard.VARIANTS.FULL;
  const dateLength = getDateLength(dateObj);
  const isNew = dateObj.new;
  const tags = getDateTags(dateObj);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [placeholder] = useState(randPlaceholder());
  const clickDateEvent = () =>
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Date',
      label: dateObj.name,
    });

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
            <InternalLink
              href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
              as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
            >
              <a onClick={clickDateEvent} className={styles.thumbnail}>
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
              </a>
            </InternalLink>
            <div className={styles.cardBody}>
              <div className={styles.titleRow}>
                <h5>
                  <InternalLink
                    href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
                    as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
                  >
                    <a>{dateObj.name}</a>
                  </InternalLink>
                </h5>
                <div className={styles.spacer} />
                <LikeButton dateObj={dateObj} />
                {/* <CommentButton /> */}
              </div>
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
              {isFull && (
                <>
                  <p className={styles.description}>{dateObj.description}</p>
                  <InternalLink
                    href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
                    as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
                  >
                    <a onClick={clickDateEvent} className={styles.desktopOnly}>
                      <Button variant={Button.VARIANTS.OUTLINED} size={Button.SIZES.SMALL}>
                        Date Details
                      </Button>
                    </a>
                  </InternalLink>
                </>
              )}

              {isNew && <div className={styles.newChip}>NEW</div>}
              {isFull && (
                <div className={styles.cardButtons}>
                  <InternalLink
                    href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
                    as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
                  >
                    <a
                      onClick={clickDateEvent}
                      className={cn(styles.mobileOnly, styles.dateDetailsButton)}
                    >
                      <Button
                        variant={Button.VARIANTS.OUTLINED}
                        fullWidth
                        size={Button.SIZES.SMALL}
                      >
                        Date Details
                      </Button>
                    </a>
                  </InternalLink>
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
