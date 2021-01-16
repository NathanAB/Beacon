import React, { useState } from 'react';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';
import moment from 'moment';

import styles from './UserDetails.module.css';
import Store from '../../store';
import Paper from '../../components/Paper/Paper';
import DateCard from '../../components/DateCard/DateCard';
import Spinner from '../../components/Spinner/Spinner';
import UserBio from '../../components/UserBio/UserBio';
import { useDesktop } from '../../utils';

const UserDetails = ({ userObj }) => {
  if (!userObj) {
    return <Spinner />;
  }

  const isDesktop = useDesktop();
  const store = Store.useStore();
  const firstName = userObj.name.split(' ')[0];
  const dates = store.get('dates');
  const userDates = dates.filter(date => date.creator === userObj.id);

  return (
    <main className={styles.container}>
      <section className={styles.userProfile}>
        <UserBio userObj={userObj} />
      </section>
      <section className={styles.dateList}>
        <p>
          Showing: <strong>{userDates.length}</strong> dates written by {firstName}
        </p>
        {userDates.map(dateObj => (
          <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
        ))}
      </section>
    </main>
  );
};

export default UserDetails;
