import React from 'react';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';

import { useRouter } from 'next/router';
import styles from './UserDetails.module.css';
import Store from '../../store';
import DateCard from '../../components/DateCard/DateCard';
import Spinner from '../../components/Spinner/Spinner';
import UserBio from '../../components/UserBio/UserBio';

const UserDetails = ({ userObj }) => {
  if (!userObj) {
    return <Spinner />;
  }

  const store = Store.useStore();
  const router = useRouter();
  const firstName = userObj.name.split(' ')[0];
  const dates = store.get('dates');
  const userDates = dates.filter(date => date.creator === userObj.id);
  const backEvent = () => router.back();

  return (
    <main className={styles.container}>
      <section className={styles.userProfile}>
        <InternalLink href="#">
          <a onClick={backEvent} className="link">
            ← Back to Date
          </a>
        </InternalLink>
        <br />
        <br />
        <UserBio userObj={userObj} />
      </section>
      <section className={styles.dateList}>
        <p>
          Showing: <strong>{userDates.length}</strong> dates written by {firstName}
        </p>
        <br />
        {userDates.map(dateObj => (
          <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
        ))}
      </section>
    </main>
  );
};

export default UserDetails;
