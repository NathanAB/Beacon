import React, { useState } from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import MarkdownIt from 'markdown-it';

import styles from './DateDetails.module.css';
import Spinner from '../../components/Spinner/Spinner';
import UserComment from '../../components/UserComment/UserComment';
import CommentInput from '../../components/CommentInput/CommentInput';
import Chip from '../../components/Chip/Chip';
import constants from '../../constants';
import {
  getDateCost,
  getDateLength,
  getDateTags,
  filterArrayToString,
  useThumbnail,
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
  const user = store.get('user');
  const users = store.get('users');
  const creator = dateObj.creator && users.find(u => u.id === dateObj.creator);
  const filterString = filterArrayToString(lastFilters);
  const backUrl = lastFilters.length
    ? `${constants.PAGES.SEARCH}?filters=${filterString}`
    : constants.PAGES.SEARCH;

  const backEvent = () =>
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Back to Explore',
    });

  const SectionImage = ({ section }) => {
    const [placeholder] = useState(randPlaceholder());
    const [highResLoaded, setHighResLoaded] = useState(false);
    const imageUrl = useThumbnail(section);

    return (
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
          <img
            alt=""
            className={styles.thumbnailImage}
            src={imageUrl}
            onLoad={() => {
              setHighResLoaded(true);
            }}
          />
          <img
            alt=""
            className={cn(
              styles.thumbnailImage,
              styles.thumbnailPlaceholder,
              highResLoaded && styles.thumbnailPlaceholderClear,
            )}
            src={placeholder}
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
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <InternalLink href={backUrl}>
          <a onClick={backEvent} className="link">
            ← Back to Explore
          </a>
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
        {dateObj.sections.map(section => (
          <SectionImage key={section?.spot?.name} section={section} />
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
        {/* <CommentButton /> */}
      </div>
      <p className={styles.description}>{dateObj.description}</p>
      <hr className={styles.lineBreak} />
      <ol className={styles.sectionList}>
        {dateObj.sections.map((section, index) => {
          return (
            <li className={styles.sectionListItem} key={section?.spot?.name}>
              <div className={styles.bullet} />
              <h5 className={styles.activityHeader}>
                {['FIRST', 'SECOND', 'THIRD'][index]} ACTIVITY
              </h5>
              <h6 className={styles.activityTitle}>{section?.spot?.name}</h6>
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
      {creator && (
        <section>
          <div className={styles.creatorTitle}>Meet the date author:</div>
          <div className={styles.creatorContainer}>
            <img
              className={styles.creatorImg}
              alt="The date writer"
              style={{ width: 80, height: 80 }}
              src={creator.imageUrl}
            />
            <div className={styles.creatorDetails}>
              <div className={styles.creatorName}>{creator.name}</div>
              <p className={styles.creatorBio}>{creator.bio}</p>
              <InternalLink
                href={`${constants.PAGES.USER_DETAILS}/[userId]`}
                as={`${constants.PAGES.USER_DETAILS}/${creator.id}`}
              >
                <a onClick={() => {}}>See all dates by {creator.name}</a>
              </InternalLink>
            </div>
          </div>
        </section>
      )}
      <hr className={styles.lineBreakNoTop} />
      <h6 id="comments">Comments ({dateObj.comments.length})</h6>
      <p className={styles.commentCaption}>
        Add a comment, tell us about your date, share a story, etc. Thanks for contributing to
        Beacon!
      </p>
      <CommentInput profilePic={user.picture} dateId={dateObj.id} />
      {dateObj.comments.map(comment => (
        <UserComment
          isOwner={comment.user.id === user.id}
          userName={comment.user.name}
          timestamp={comment.createdAt}
          profilePic={comment.user.imageUrl || tipFlower}
          content={comment.content}
          commentId={comment.id}
        />
      ))}
      <hr className={styles.lineBreak} />
      <div className={styles.backButtonMobile}>
        <InternalLink href={backUrl}>
          <a onClick={backEvent} className="link">
            ← Back to Explore
          </a>
        </InternalLink>
      </div>
    </div>
  );
};

export default DateDetails;
