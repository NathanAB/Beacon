import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { Checkbox } from '@material-ui/core';
import { Experiment, Variant } from 'react-optimize';

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
  const likedDates = store.get('likedDates');
  const isFilterBarExpanded = store.get('isFilterBarExpanded');
  const [filters] = useFilters();

  const [sortBy, setSortBy] = useState(options[0]);
  const [likedOnly, setLikedOnly] = useState(false);
  let filteredDates = filterDates(dateObjs, filters).sort(
    sortBy.value === 'Oldest' ? dateSorterOldest : dateSorterNewest,
  );
  if (likedOnly) {
    filteredDates = filteredDates.filter(dateObj => likedDates.includes(dateObj.id));
  }
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
          <Experiment id="xYIuiUCYTeGwXxODjB4B3Q">
            <Variant id="0">
              <div className={styles.selectContainer}>
                <Select
                  value={sortBy}
                  size="small"
                  onChange={toggleSort}
                  options={options}
                ></Select>
              </div>
            </Variant>
            <Variant id="1">
              <span className={styles.sortBy}>Liked dates only:</span>
              <Checkbox
                color="primary"
                checked={likedOnly}
                onChange={e => {
                  setLikedOnly(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Variant>
          </Experiment>
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
