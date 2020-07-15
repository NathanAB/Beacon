import React, { useState } from 'react';
import ReactGA from 'react-ga';

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
  const isFilterBarExpanded = store.get('isFilterBarExpanded');
  const [filters] = useFilters();

  const [sortBy, setSortBy] = useState(options[0]);
  const filteredDates = filterDates(dateObjs, filters).sort(
    sortBy.value === 'Oldest' ? dateSorterOldest : dateSorterNewest,
  );
  const resultsLength = filteredDates.length;

  const toggleSort = val => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Select Sort',
      label: val.value,
    });
    setSortBy(val);
  };
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
            <Select value={sortBy} onChange={toggleSort} options={options}></Select>
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
