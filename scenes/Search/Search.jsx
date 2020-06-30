import React, { useState } from 'react';
import styles from './Search.module.css';

import Header from './Header/Header';
import FilterBar from './FilterBar/FilterBar';
import Results from './Results/Results';

export default function Search() {
  return (
    <div className={styles.container}>
      <Header />
      <FilterBar />
      <Results />
    </div>
  );
}
