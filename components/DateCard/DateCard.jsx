import React, { useState } from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import { GoComment } from 'react-icons/go';

import Paper from '../Paper/Paper';
import LikeButton from '../LikeButton/LikeButton';

import placeholder1 from '../../assets/graphics/pattern-1.svg';
import placeholder2 from '../../assets/graphics/pattern-2.svg';
import placeholder3 from '../../assets/graphics/pattern-3.svg';
import placeholder4 from '../../assets/graphics/pattern-4.svg';
import cn from '../../utils/cn';

import styles from './DateCard.module.css';
import { getDateCost, getDateLength, getDateTags, useDesktop, useThumbnail } from '../../utils';
import Chip from '../Chip/Chip';
import Constants from '../../constants';
import Store from '../../store';
import Button from '../Button/Button';

const placeholderImgs = [placeholder1, placeholder2, placeholder3, placeholder4];

const randPlaceholder = () => placeholderImgs[Math.floor(Math.random() * Math.floor(4))];

export default function DateCard({ dateObj, variant = DateCard.VARIANTS.PREVIEW, isFavorite }) {
  const isDesktop = useDesktop();
  const store = Store.useStore();
  const section1 = dateObj.sections[0];
  const imageUrl = useThumbnail(section1);
  const isFull = variant === DateCard.VARIANTS.FULL;
  const dateLength = getDateLength(dateObj);
  const isNew = dateObj.new;
  const tags = getDateTags(dateObj);
  const users = store.get('users');
  const dateCreator = users.find(user => user.id === dateObj.creator);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [placeholder] = useState(randPlaceholder());
  const numComments = dateObj?.comments?.length;
  const isDraft = !dateObj.active;
  const clickDateEvent = () =>
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Date',
      label: dateObj.name,
    });

  const onEdit = e => {
    e.preventDefault();
    store.set('adminEditingDate')(dateObj);
    return false;
  };

  const CommentLink = () => {
    return (
      <InternalLink
        href={`${Constants.PAGES.DATE_DETAILS}/[dateId]#comments`}
        as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}#comments`}
      >
        <a onClick={clickDateEvent} className={styles.commentLink}>
          <GoComment className={styles.commentIcon} />
          {numComments ? (
            <span>
              {numComments} {numComments === 1 ? 'Comment' : 'Comments'}
            </span>
          ) : (
            <span>Add a comment</span>
          )}
        </a>
      </InternalLink>
    );
  };

  const renderInner = () => (
    <Paper fullWidth highlighted={isFavorite} withHover withShadow>
      <div className={styles.cardContent}>
        <span className={styles.thumbnail}>
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
        </span>
        <div className={styles.cardBody}>
          <div className={styles.titleRow}>
            <h5 className="text-xl font-bold">{dateObj.name}</h5>
            <div className={styles.spacer} />
            {isFull && isDesktop && !isDraft && <LikeButton dateObj={dateObj} />}
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
          {(!isFull || !isDesktop) && !isDraft && (
            <div className={styles.commentSaveRow}>
              <CommentLink numComments={numComments} />
              <LikeButton dateObj={dateObj} />
            </div>
          )}
          {dateCreator && (
            <div className={styles.creatorRow}>
              <InternalLink
                href={`${Constants.PAGES.USER_DETAILS}/[userId]`}
                as={`${Constants.PAGES.USER_DETAILS}/${dateCreator.id}`}
              >
                <a className={styles.creatorContainer}>
                  <img
                    className={styles.creatorImg}
                    src={dateCreator.imageUrl}
                    alt="The date creator"
                  />
                  <span>{dateCreator.name}</span>
                  {dateCreator.isNew && <span className={styles.newCreator}>NEW CREATOR</span>}
                </a>
              </InternalLink>
            </div>
          )}

          {isFull && !isDraft && (
            <>
              <p className={styles.description}>{dateObj.description}</p>
              <div className={styles.cardButtons}>
                {isDesktop && <CommentLink numComments={numComments} />}
                <InternalLink
                  href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
                  as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
                >
                  <a onClick={clickDateEvent} className="text-lg text-orange font-bold">
                    View Details →
                  </a>
                </InternalLink>
              </div>
            </>
          )}
          {isDraft && (
            <>
              <p className={styles.description}>{dateObj.description}</p>
              <Button onClick={onEdit}>Edit Draft</Button>
            </>
          )}
        </div>
        {isNew && <div className={styles.newChip}>NEW DATE</div>}
      </div>
    </Paper>
  );

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.cardContainer,
          isFull ? styles.fullDateCard : '',
          isFavorite ? styles.favorite : '',
        )}
      >
        {isDraft ? (
          renderInner()
        ) : (
          <InternalLink
            href={`${Constants.PAGES.DATE_DETAILS}/[dateId]`}
            as={`${Constants.PAGES.DATE_DETAILS}/${dateObj.id}`}
          >
            <a onClick={clickDateEvent}>{renderInner()}</a>
          </InternalLink>
        )}
      </div>
    </div>
  );
}

DateCard.VARIANTS = {
  PREVIEW: 'preview',
  FULL: 'full',
};
