import React, { useState } from 'react';
import styles from './Search.module.css';

import Header from './Header/Header';
import FilterBar from './FilterBar/FilterBar';
import Results from './Results/Results';

export default function Search() {
  const [isFilterBarExpanded, setIsFilterBarExpanded] = useState(false);
  const [results, setResults] = useState(0);

  return (
    <div className={styles.container}>
      <Header />
      <FilterBar
        isFilterBarExpanded={isFilterBarExpanded}
        setIsFilterBarExpanded={setIsFilterBarExpanded}
        results={results}
      />
      <Results isFilterBarExpanded={isFilterBarExpanded} setResults={setResults} />
    </div>
  );
}
