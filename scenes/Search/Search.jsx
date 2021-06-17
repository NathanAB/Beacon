import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import ReactGA from 'react-ga';
import styles from './Search.module.css';

import Constants from '../../constants';
import FilterBar from './FilterBar/FilterBar';
import Results from './Results/Results';
import LoginButton from '../../components/LoginButton/LoginButton';
import Store from '../../store';

export default function Search({ savedOnly }) {
  const store = Store.useStore();
  const user = store.get('user');
  const popupSeen = localStorage.getItem(Constants.LOCAL_STORAGE.POPUP_SEEN);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!popupSeen && !user) {
        ReactGA.event({
          category: 'Interaction',
          action: 'Saw Popup',
        });
        localStorage.setItem(Constants.LOCAL_STORAGE.POPUP_SEEN, true);
        setShowPopup(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="form-dialog-title"
      >
        <div className="text-center p-5 py-7 max-w-lg md:p-10">
          <h3 className="font-normal leading-tight text-4xl">Looking for tips & tricks?</h3>
          <h6 className="my-6">
            Start your free trial for full access to all of our locally curated dates
          </h6>
          <div className="mt-6 mx-auto w-80 max-w-full">
            <LoginButton className="my-4" type="google" />
          </div>
          <div className="mt-4 mx-auto w-80 max-w-full">
            <LoginButton type="facebook" />
          </div>
        </div>
      </Dialog>
      <h2>{savedOnly ? 'Saved' : 'Explore'} Dates</h2>
      <FilterBar />
      <Results savedOnly={savedOnly} />
    </div>
  );
}
