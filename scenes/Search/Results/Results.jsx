import React, { useState } from 'react';
import styles from './Results.module.css';
import Select from '../../../components/Select/Select';
import DateCard from '../../../components/DateCard/DateCard';
import Store from '../../../store';
import { useFilters, filterDates, dateSorterNewest, dateSorterOldest } from '../../../utils';

const options = [
  {
    value: 'Newest',
    label: 'Newest',
  },
  {
    value: 'Oldest',
    label: 'Oldest',
  },
];

export default function Results() {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const searchResultsLength = store.get('searchResultsLength');
  const setSearchResultsLength = store.set('searchResultsLength');
  const isFilterBarExpanded = store.get('isFilterBarExpanded');
  const [filters] = useFilters();

  const [sortBy, setSortBy] = useState(options[0]);
  let filteredDates = filterDates(dateObjs, filters);
  const resultsLength = filteredDates.length;
  if (searchResultsLength !== resultsLength) {
    setSearchResultsLength(resultsLength);
  }

  filteredDates = filteredDates.sort(
    sortBy.value === 'Oldest' ? dateSorterOldest : dateSorterNewest,
  );

  return (
    <div>
      {!isFilterBarExpanded && (
        <div className={styles.sortRow}>
          <p>
            {resultsLength} result{resultsLength !== 1 && 's'}
          </p>
          <div className={styles.sortRowSpacer}></div>
          <h6>Sort by:</h6>
          <div className={styles.selectContainer}>
            <Select value={sortBy} onChange={setSortBy} options={options}></Select>
          </div>
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
