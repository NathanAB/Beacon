import React from 'react';

import Store from '../../../store';
import styles from './FilterBar.module.css';
import Paper from '../../../components/Paper/Paper';
import Button from '../../../components/Button/Button';
import Chip from '../../../components/Chip/Chip';
import cn from '../../../utils/cn';
import { useFilters } from '../../../utils';

export default function FilterBar({ results, isFilterBarExpanded, setIsFilterBarExpanded }) {
  const store = Store.useStore();
  const neighborhoods = store.get('neighborhoods');
  const tags = store.get('tags');
  const durations = store.get('durations');
  const costs = store.get('costs');

  const [filters, setFilters] = useFilters();

  const deleteFilter = filterVal => {
    const newFilters = filters.filter(currFilter => currFilter.value !== filterVal);
    setFilters(newFilters);
  };

  const expandedFilters = () => (
    <div className={cn(styles.outerContainer, styles.expanded)}>
      <Paper withShadow>
        <div className={styles.innerContainer}>
          <div className={styles.filterSection}>
            <h6 className={styles.sectionTitle}>Neighborhood</h6>
            <div className={styles.filterChips}>
              {neighborhoods.map(n => (
                <div className={styles.chipContainer}>
                  <Chip>{n.name}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.filterSection}>
            <h6 className={styles.sectionTitle}>Vibe</h6>
            <div className={styles.filterChips}>
              {tags.map(n => (
                <div className={styles.chipContainer}>
                  <Chip>{n.name}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.filterSection}>
            <h6 className={styles.sectionTitle}>Cost</h6>
            <div className={styles.filterChips}>
              {costs.map(n => (
                <div className={styles.chipContainer}>
                  <Chip>{n}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.filterSection}>
            <h6 className={styles.sectionTitle}>Duration</h6>
            <div className={styles.filterChips}>
              {durations.map(n => (
                <div className={styles.chipContainer}>
                  <Chip>{n}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonRow}>
            <span>
              {results} result{results !== 1 && 's'}
            </span>
            <Button
              variant={Button.VARIANTS.PRIMARY}
              size={Button.SIZES.SMALL}
              onClick={() => setIsFilterBarExpanded(false)}
            >
              Save filters
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );

  if (isFilterBarExpanded) {
    return expandedFilters();
  }

  return (
    <div className={styles.outerContainer}>
      <Paper withShadow>
        <div className={styles.innerContainer}>
          <h6>Filtered by:</h6>
          <div className={styles.filterChips}>
            {filters.map(filter => (
              <div className={styles.chipContainer} key={filter.value}>
                <Chip variant={Chip.VARIANTS.PRIMARY} onDelete={() => deleteFilter(filter.value)}>
                  {filter.value}
                </Chip>
              </div>
            ))}
          </div>
          <Button
            variant={Button.VARIANTS.PRIMARY}
            size={Button.SIZES.SMALL}
            onClick={() => setIsFilterBarExpanded(true)}
          >
            Add filters
          </Button>
        </div>
      </Paper>
    </div>
  );
}
