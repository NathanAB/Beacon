import React from 'react';
import InternalLink from 'next/link';

import styles from './DateDetails.module.css';
import BeaconTitle from '../../components/BeaconTitle/BeaconTitle';
import Spinner from '../../components/Spinner/Spinner';
import Chip from '../../components/Chip/Chip';
import constants from '../../constants';
import {
  getSectionImage,
  getDateCost,
  getDateLength,
  getDateTags,
  createCalendarEvent,
} from '../../utils';
import dc3 from '../../assets/img/dc-3.jpeg';
import ShareButton from '../../components/DateCard/components/ShareButton/ShareButton';

const DateDetails = ({ dateObj }) => {
  if (!dateObj) {
    return <Spinner />;
  }

  const dateLength = getDateLength(dateObj);
  const tags = getDateTags(dateObj);
  const dateCost = getDateCost(dateObj);
  const calendarEvent = createCalendarEvent(dateObj);

  return (
    <div className={styles.container}>
      <BeaconTitle />
      <div className={styles.backButton}>
        <InternalLink href={constants.PAGES.SEARCH}>
          {/* TODO: Respect search filters on back */}
          <a>← Back to Explore</a>
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
      <div className={styles.thumbnailContainer}>
        {dateObj.sections.map(section => (
          <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url(${getSectionImage(section)}), url(${dc3})` }}
          />
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
        <ShareButton event={calendarEvent} url={window.location.href} />
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
                  <h6 className={styles.tipsTitle}>Tips & Tricks</h6>
                  <ul>
                    {section.tips
                      .replace('"', '')
                      .split('* ')
                      .filter(tip => tip)
                      .map(tip => (
                        <li className={styles.tipListItem}>{tip}</li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default DateDetails;
