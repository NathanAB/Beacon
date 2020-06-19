import React from 'react';
import styles from './FilterBar.module.css';
import Paper from '../../../components/Paper/Paper';
import Button from '../../../components/Button/Button';
import Chip from '../../../components/Chip/Chip';
import { useFilters } from '../../../utils';

export default function FilterBar() {
  const [filters, setFilters] = useFilters();

  const deleteFilter = filterVal => {
    const newFilters = filters.filter(currFilter => currFilter.value !== filterVal);
    setFilters(newFilters);
  };

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
          <Button variant={Button.VARIANTS.PRIMARY} size={Button.SIZES.SMALL}>
            Add filters
          </Button>
        </div>
      </Paper>
    </div>
  );
}
