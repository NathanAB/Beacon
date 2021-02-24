import React, { useState } from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Store from '../../store';
import { updateUser, auth } from '../../api';
import styles from './UserBio.module.css';
import Paper from '../Paper/Paper';
import Spinner from '../Spinner/Spinner';
import { useDesktop } from '../../utils';
import Button from '../Button/Button';
import EditProfile from './EditProfile/EditProfile';

const UserBio = ({ userObj, isProfile }) => {
  const store = Store.useStore();
  const isDesktop = useDesktop();
  const dateJoined = moment(userObj.createdAt);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onSave = async newUserData => {
    setIsSaving(true);
    try {
      await updateUser(newUserData);
      const freshUserData = await auth();
      store.set('user')(freshUserData);
      toast.success('Profile updated');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error('There was a problem updating your profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return (
      <Paper fullWidth withShadow noBorder={isDesktop}>
        <div className={styles.userCardContent}>
          <Spinner />
        </div>
      </Paper>
    );
  }

  return (
    <>
      <EditProfile
        userObj={userObj}
        isOpen={isEditing && !isSaving}
        onCancel={() => setIsEditing(false)}
        onSave={onSave}
      />
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

          {isProfile && (
            <div className={styles.userBio}>
              <a className={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit Profile &nbsp;
                <span className={styles.editButton}>
                  <FiEdit />
                </span>
              </a>
            </div>
          )}
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

            <div className={styles.social}>
              {userObj.instagram && (
                <ReactGA.OutboundLink
                  to={`https://www.instagram.com/${userObj.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventLabel="Click user's Instagram"
                >
                  <AiOutlineInstagram />
                  &nbsp;
                </ReactGA.OutboundLink>
              )}
              {userObj.twitter && (
                <ReactGA.OutboundLink
                  to={`https://www.twitter.com/${userObj.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventLabel="Click user's Twitter"
                >
                  <AiOutlineTwitter />
                </ReactGA.OutboundLink>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default UserBio;
