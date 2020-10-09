import React, { useState } from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import MarkdownIt from 'markdown-it';

import styles from './DateDetails.module.css';
import BeaconTitle from '../../components/BeaconTitle/BeaconTitle';
import CommentButton from '../../components/CommentButton/CommentButton';
import Spinner from '../../components/Spinner/Spinner';
import Chip from '../../components/Chip/Chip';
import constants from '../../constants';
import {
  getSectionImage,
  getDateCost,
  getDateLength,
  getDateTags,
  filterArrayToString,
} from '../../utils';
import cn from '../../utils/cn';
import tipFlower from '../../assets/graphics/tip-flower.svg';
import LikeButton from '../../components/LikeButton/LikeButton';
import Store from '../../store';

import placeholderImg1 from '../../assets/graphics/pattern-1.svg';
import placeholderImg2 from '../../assets/graphics/pattern-2.svg';
import placeholderImg3 from '../../assets/graphics/pattern-3.svg';
import placeholderImg4 from '../../assets/graphics/pattern-4.svg';

const mdParser = new MarkdownIt();

const placeholderImgs = [placeholderImg1, placeholderImg2, placeholderImg3, placeholderImg4];

const randPlaceholder = () => placeholderImgs[Math.floor(Math.random() * Math.floor(4))];

const DateDetails = ({ dateObj }) => {
  if (!dateObj) {
    return <Spinner />;
  }

  const dateLength = getDateLength(dateObj);
  const tags = getDateTags(dateObj);
  const dateCost = getDateCost(dateObj);
  const store = Store.useStore();
  const lastFilters = store.get('lastFilters');
  const filterString = filterArrayToString(lastFilters);
  const backUrl = lastFilters.length
    ? `${constants.PAGES.SEARCH}?filters=${filterString}`
    : constants.PAGES.SEARCH;

  const [highResLoaded1, setHighResLoaded1] = useState(false);
  const [highResLoaded2, setHighResLoaded2] = useState(false);
  const [highResLoaded3, setHighResLoaded3] = useState(false);
  const highResLoaded = [highResLoaded1, highResLoaded2, highResLoaded3];
  const setHighResLoaded = [setHighResLoaded1, setHighResLoaded2, setHighResLoaded3];
  const [placeholder1] = useState(randPlaceholder());
  const [placeholder2] = useState(randPlaceholder());
  const [placeholder3] = useState(randPlaceholder());
  const placeholder = [placeholder1, placeholder2, placeholder3];
  const backEvent = () =>
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Back to Explore',
    });

  return (
    <div className={styles.container}>
      <BeaconTitle />
      <div className={styles.backButton}>
        <InternalLink href={backUrl}>
          <a onClick={backEvent}>← Back to Explore</a>
        </InternalLink>
      </div>
      <h3 className={styles.dateTitle}>
        {dateObj.name}{' '}
        {dateObj.new && (
          <span className={styles.newTag}>
            <Chip variant={Chip.VARIANTS.PRIMARY}>NEW</Chip>
          </span>
        )}
      </h3>
      <div className={styles.thumbnailRowContainer}>
        {dateObj.sections.map((section, i) => (
          <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnail}>
              <img
                alt=""
                className={styles.thumbnailImage}
                src={getSectionImage(section)}
                onLoad={() => {
                  setHighResLoaded[i](true);
                }}
              />
              <img
                alt=""
                className={cn(
                  styles.thumbnailImage,
                  styles.thumbnailPlaceholder,
                  highResLoaded[i] && styles.thumbnailPlaceholderClear,
                )}
                src={placeholder[i]}
              />
            </div>
            {section.image && section.imageAuthor && (
              <span className={styles.imageAuthor}>
                Photo:{' '}
                <ReactGA.OutboundLink
                  to={`https://www.instagram.com/p/${section.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventLabel={`Instagram post by ${section.imageAuthor}`}
                >
                  {`@${section.imageAuthor}`}
                </ReactGA.OutboundLink>
              </span>
            )}
          </div>
        ))}
      </div>
      <div className={styles.metaRow}>
        <div className={styles.metaData}>
          <div className={styles.timeAndCost}>
            {dateLength} hours · {dateCost}
          </div>
          <div className={styles.tagsContainer}>
            {tags.map(tag => (
              <div key={tag.tagId} className={styles.tag}>
                <Chip>{tag.name}</Chip>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.spacer} />
        <LikeButton dateObj={dateObj} />
        <CommentButton />
      </div>
      <p className={styles.description}>{dateObj.description}</p>
      <div className={styles.lineBreak} />
      <ol className={styles.sectionList}>
        {dateObj.sections.map((section, index) => {
          return (
            <li className={styles.sectionListItem}>
              <div className={styles.bullet} />
              <h5 className={styles.activityHeader}>
                {['FIRST', 'SECOND', 'THIRD'][index]} ACTIVITY
              </h5>
              <h6 className={styles.activityTitle}>{section.spot.name}</h6>
              <p className={styles.activityDescription}>{section.description}</p>
              {section.tips && (
                <div className={styles.tipsBox}>
                  <h6 className={styles.tipsTitle}>
                    <img
                      alt="A small orange flower decorating the tips section."
                      className={styles.tipFlower}
                      src={tipFlower}
                    />
                    Tips & Tricks
                  </h6>
                  <div dangerouslySetInnerHTML={{ __html: mdParser.render(section.tips) }}></div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className={styles.backButtonMobile}>
        <InternalLink href={backUrl}>
          <a onClick={backEvent}>← Back to Explore</a>
        </InternalLink>
      </div>
    </div>
  );
};

export default DateDetails;
