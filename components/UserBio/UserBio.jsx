import React, { useState } from 'react';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';
import moment from 'moment';

import styles from './UserBio.module.css';
import Paper from '../Paper/Paper';
import { useDesktop } from '../../utils';

const UserDetails = ({ userObj }) => {
  const isDesktop = useDesktop();
  const dateJoined = moment(userObj.createdAt);

  return (
    <Paper fullWidth withShadow noBorder={isDesktop}>
      <div className={styles.userCardContent}>
        <div className={styles.userCardHeader}>
          <img alt="Date writer profile" className={styles.userImage} src={userObj.imageUrl} />
          <div className={styles.userMeta}>
            <h5>{userObj.name}</h5>
            <p className={styles.dateWriterSince}>
              Date Writer since {dateJoined.format('MMMM YYYY')}
            </p>
          </div>
        </div>
        <div className={styles.userBio}>
          <p>{userObj.bio}</p>
          <br />
          {userObj.dob && (
            <>
              <p>
                <strong>Age: </strong>
                {moment().diff(userObj.dob, 'years')}
              </p>
              <br />
            </>
          )}
          {userObj.relationshipStatus && (
            <>
              <p>
                <strong>Relationship status: </strong>
                {userObj.relationshipStatus}
              </p>
              <br />
            </>
          )}
          {userObj.favoriteNeighborhoods && (
            <>
              <p>
                <strong>Favorite DC neighborhoods: </strong>
                {userObj.favoriteNeighborhoods}
              </p>
              <br />
            </>
          )}
          {userObj.dateSpecialties && (
            <>
              <p>
                <strong>Date specialties: </strong>
                {userObj.dateSpecialties}
              </p>

              <br />
            </>
          )}
          {userObj.secretTalent && (
            <>
              <p>
                <strong>Secret talent: </strong>
                {userObj.secretTalent}
              </p>
              <br />
            </>
          )}
          {userObj.firstDate && (
            <>
              <p>
                <strong>First ever date: </strong>
                {userObj.firstDate}
              </p>
              <br />
            </>
          )}
          {userObj.instagram && (
            <>
              <p>
                <strong>Instagram: </strong>
                <ReactGA.OutboundLink
                  to={`https://www.instagram.com/${userObj.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventLabel="Click user's Instagram"
                >
                  {userObj.instagram}
                </ReactGA.OutboundLink>
              </p>
              <br />
            </>
          )}
          {userObj.twitter && (
            <p>
              <strong>Twitter: </strong>
              <ReactGA.OutboundLink
                to={`https://www.twitter.com/${userObj.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                eventLabel="Click user's Twitter"
              >
                {userObj.twitter}
              </ReactGA.OutboundLink>
            </p>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default UserDetails;
