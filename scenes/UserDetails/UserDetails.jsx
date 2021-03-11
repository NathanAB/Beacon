import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
  const [activeTab, setTab] = useState(0);
  const onTabChange = (event, newValue) => {
    setTab(newValue);
  };

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
        {isProfile && (
          <>
            <br />

            <Button
              onClick={() => {
                setIsEditingDate({
                  sections: [{}, {}],
                });
              }}
            >
              Draft New Date Idea
            </Button>
            <br />
            <br />
          </>
        )}

        {isProfile ? (
          <>
            <Tabs>
              <TabList>
                <Tab>
                  <h6>Draft Dates</h6>
                </Tab>
                <Tab>
                  <h6>Active Dates</h6>
                </Tab>
              </TabList>

              <TabPanel>
                {draftDates.map(dateObj => (
                  <div className={styles.dateContainer}>
                    <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
                  </div>
                ))}
              </TabPanel>
              <TabPanel>
                {activeDates.map(dateObj => (
                  <div className={styles.dateContainer}>
                    <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
                  </div>
                ))}
              </TabPanel>
            </Tabs>
          </>
        ) : (
          <>
            {activeDates.map(dateObj => (
              <div className={styles.dateContainer}>
                <DateCard variant={DateCard.VARIANTS.FULL} dateObj={dateObj} />
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  );
};

export default UserDetails;
