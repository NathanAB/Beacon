import React, { useState } from 'react';
import styles from './Results.module.css';
import Select from '../../../components/Select/Select';
import DateCard from '../../../components/DateCard/DateCard';
import Store from '../../../store';

const options = [
  {
    value: 'Newest',
    label: 'Newest',
  },
  {
    value: 'Cost',
    label: 'Cost',
  },
  {
    value: 'Time',
    label: 'Time',
  },
];

export default function Results() {
  const store = Store.useStore();
  const dateObjs = store.get('dates');

  const [sortBy, setSortBy] = useState(options[0]);
  return (
    <div>
      <div className={styles.sortRow}>
        <p>10 results</p>
        <div className={styles.sortRowSpacer}></div>
        <h6>Sort by:</h6>
        <div className={styles.selectContainer}>
          <Select value={sortBy} onChange={setSortBy} options={options}></Select>
        </div>
      </div>
      <div className={styles.resultList}>
        <div className={styles.dateCardContainer}>
          <DateCard isNew dateObj={dateObjs[0]} variant={DateCard.VARIANTS.FULL} />
        </div>
        <div className={styles.dateCardContainer}>
          <DateCard isNew dateObj={dateObjs[1]} variant={DateCard.VARIANTS.FULL} />
        </div>
        <div className={styles.dateCardContainer}>
          <DateCard isNew dateObj={dateObjs[2]} variant={DateCard.VARIANTS.FULL} />
        </div>
        <div className={styles.dateCardContainer}>
          <DateCard isNew dateObj={dateObjs[3]} variant={DateCard.VARIANTS.FULL} />
        </div>
        <div className={styles.dateCardContainer}>
          <DateCard isNew dateObj={dateObjs[4]} variant={DateCard.VARIANTS.FULL} />
        </div>{' '}
      </div>
    </div>
  );
}
