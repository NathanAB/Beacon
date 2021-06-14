import React, { useState } from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';
import MarkdownIt from 'markdown-it';

import styles from './DateDetails.module.css';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
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
import membershipImg from '../../assets/img/membership-img-2.png';
import LikeButton from '../../components/LikeButton/LikeButton';
import Store from '../../store';
import LoginButton from '../../components/LoginButton/LoginButton';

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
  const hasAccess = store.get('hasAccess');
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

  const renderPayWall = () => (
    <div className="w-full max-w-5xl m-auto flex flex-col-reverse md:flex-row flex-wrap my-12">
      <div className="md:w-1/2 md:pr-8 text-center">
        <h3 className="font-normal leading-tight">Subscribe for full access</h3>
        <h6 className="my-6">Help us support our local date writers</h6>
        <ul className="text-left">
          <li className="my-4">
            <strong>Beacon makes dating in DC easiser.</strong> New dates are added every week.
          </li>
          <li className="my-4">
            <strong>Everything you’ll need to impress.</strong> Get unique tips, secret spots, and
            insider tips
          </li>
          <li className="my-4">
            <strong>Don’t settle for just one perspective.</strong> our date writers have diverse
            backgrounds and experiences
          </li>
        </ul>
        <InternalLink href={`${constants.PAGES.MEMBERSHIP}`}>
          <Button>Subscribe now</Button>
        </InternalLink>
      </div>
      <div className="md:w-1/2 mb-6">
        <img
          src={membershipImg}
          className="w-full"
          alt="Access to full content like date tips and user comments"
        />
      </div>
    </div>
  );

  const renderTrialWall = () => (
    <div className="w-full max-w-5xl m-auto flex flex-col-reverse md:flex-row flex-wrap my-12">
      <div className="md:w-1/2 md:pr-10 text-center">
        <h3 className="font-normal leading-tight">
          We'll show you a<br />
          good time
        </h3>
        <h6 className="my-6">
          Start your free trial for full access to this and other locally curated dates
        </h6>
        <ul className="text-left">
          <li className="my-4">
            <strong>Beacon just makes dating easier.</strong> We keep it fresh with new ideas added
            every week.
          </li>
          <li className="my-4">
            <strong>Everything you’ll need to impress.</strong> You'll love our unique tips, secret
            spots, and insider tips.
          </li>
          <li className="my-4">
            <strong>Don’t settle for just one perspective.</strong> Our date writers have diverse
            backgrounds and experiences.
          </li>
        </ul>
        <div className="mt-6 mx-auto w-72">
          <LoginButton className="my-4" type="google" />
        </div>
        <div className="mt-4 mx-auto w-72">
          <LoginButton type="facebook" />
        </div>
        {/* <Button>Subscribe now</Button>
        <br />
        <a>No thanks, log in to start my free trial</a> */}
      </div>
      <div className="md:w-1/2 mb-6">
        <img
          src={membershipImg}
          className="w-full"
          alt="Access to full content like date tips and user comments"
        />
      </div>
    </div>
  );

  const renderContent = () => (
    <>
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
      <h6 id="comments">Comments ({dateObj?.comments?.length})</h6>
      <p className={styles.commentCaption}>
        Add a comment, tell us about your date, share a story, etc. Thanks for contributing to
        Beacon!
      </p>
      <CommentInput profilePic={user.picture} dateId={dateObj.id} />
      {dateObj?.comments?.map(comment => (
        <UserComment
          isOwner={comment.user.id === user.id}
          userName={comment.user.name}
          timestamp={comment.createdAt}
          profilePic={comment.user.imageUrl || tipFlower}
          content={comment.content}
          commentId={comment.id}
        />
      ))}
    </>
  );

  const renderBody = () => {
    if (user) {
      if (hasAccess) {
        return renderContent();
      }
      return renderPayWall();
    }
    return renderTrialWall();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <InternalLink href={backUrl}>
          <a onClick={backEvent}>← Back to Explore</a>
        </InternalLink>
      </div>
      <h3 className={styles.dateTitle}>
        {dateObj.name}{' '}
        {dateObj.new && (
          <span className={styles.newTag}>
            <Chip variant={Chip.VARIANTS.PRIMARY}>NEW DATE</Chip>
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
      </div>
      {/* <p className={`${styles.description} ${!hasAccess && 'max-h-32 overflow-hidden relative'}`}>
        {!hasAccess && (
          <div className="bg-gradient-to-b absolute top-10 bottom-0 left-0 right-0 w-full from-transparent to-white" />
        )}
        {dateObj.description}
      </p> */}
      <p className={styles.description}>{dateObj.description}</p>
      <div className={styles.curtainContainer}>
        <hr className={styles.lineBreak} />
        {renderBody()}
        <hr className={styles.lineBreak} />
        <div className={styles.backButtonMobile}>
          <InternalLink href={backUrl}>
            <a onClick={backEvent}>← Back to Explore</a>
          </InternalLink>
        </div>
      </div>
    </div>
  );
};

export default DateDetails;
