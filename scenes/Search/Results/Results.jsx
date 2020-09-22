import React, { useState } from 'react';
import { Checkbox } from '@material-ui/core';

import styles from './Results.module.css';
import DateCard from '../../../components/DateCard/DateCard';
import Store from '../../../store';
import { useFilters, filterDates, dateSorterNewest } from '../../../utils';

export default function Results() {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const likedDates = store.get('likedDates');
  const isFilterBarExpanded = store.get('isFilterBarExpanded');
  const [filters] = useFilters();

  const [likedOnly, setLikedOnly] = useState(false);
  let filteredDates = filterDates(dateObjs, filters).sort(dateSorterNewest);
  if (likedOnly) {
    filteredDates = filteredDates.filter(dateObj => likedDates.includes(dateObj.id.toString()));
  }
  const resultsLength = filteredDates.length;

  return (
    <div>
      {!isFilterBarExpanded && (
        <div className={styles.sortRow}>
          <p>
            {resultsLength} result{resultsLength !== 1 && 's'}
          </p>
          <div className={styles.sortRowSpacer}></div>
          <span className={styles.sortBy}>Only Favorites:</span>
          <Checkbox
            color="primary"
            checked={likedOnly}
            onChange={e => {
              setLikedOnly(e.target.checked);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
      )}
      <div className={styles.resultList}>
        {filteredDates.map(dateObj => (
          <div className={styles.dateCardContainer} key={dateObj.id}>
            <DateCard isNew dateObj={dateObj} variant={DateCard.VARIANTS.FULL} />
          </div>
        ))}
      </div>
    </div>
  );
}
