import React from 'react';
import styles from './Search.module.css';

import FilterBar from './FilterBar/FilterBar';
import Results from './Results/Results';

export default function Search({ savedOnly }) {
  return (
    <div className={styles.container}>
      <h2>{savedOnly ? 'Saved' : 'Explore'} Dates</h2>
      <FilterBar />
      <Results savedOnly={savedOnly} />
    </div>
  );
}
