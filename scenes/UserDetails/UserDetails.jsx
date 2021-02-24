import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';

import { useRouter } from 'next/router';
import styles from './UserDetails.module.css';
import Store from '../../store';
import DateCard from '../../components/DateCard/DateCard';
import Spinner from '../../components/Spinner/Spinner';
import UserBio from '../../components/UserBio/UserBio';
import Button from '../../components/Button/Button';

const EditDateForm = dynamic(() => import('../../components/EditDateForm/EditDateForm'), {
  ssr: false,
});

const UserDetails = ({ userObj, isProfile }) => {
  const store = Store.useStore();
  const router = useRouter();
  const firstName = userObj?.name?.split(' ')[0];
  const userDates = isProfile
    ? store.get('myDates')
    : store.get('dates').filter(dateObj => dateObj.creator === userObj.id);
  const isEditingDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const backEvent = () => router.back();

  const draftDates = userDates.filter(dateObj => !dateObj.active);
  const activeDates = userDates.filter(dateObj => dateObj.active);

  console.log(isEditingDate);

  if (!userObj) {
    return <Spinner />;
  }

  return (
    <main className={styles.container}>
      {isEditingDate && <EditDateForm />}

      <section className={styles.userProfile}>
        {!isProfile && (
          <InternalLink href="#">
            <a onClick={backEvent} className="link">
              ← Back to Date
            </a>
          </InternalLink>
        )}
        <br />
        <br />
        <UserBio userObj={userObj} isProfile={isProfile} />
      </section>
      <section className={styles.dateList}>
        <p>
          Showing: <strong>{userDates.length}</strong> dates written by {firstName}
        </p>
        <br />
        {isProfile && (
          <Button
            onClick={() => {
              setIsEditingDate({
                sections: [{}, {}],
              });
            }}
          >
            Draft New Date Idea
          </Button>
        )}
        {isProfile && !!draftDates.length && (
          <>
            <br />
            <br />
            <h5>Draft Dates</h5>
          </>
        )}
        {isProfile &&
          draftDates.map(dateObj => (
            <div className={styles.dateContainer}>
              <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
            </div>
          ))}

        {isProfile && !!activeDates.length && (
          <>
            <br />
            <br />
            <h5>Active Dates</h5>
          </>
        )}

        {activeDates.map(dateObj => (
          <div className={styles.dateContainer}>
            <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default UserDetails;
