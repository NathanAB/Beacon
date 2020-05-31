import React from 'react';
import styles from './FilterBar.module.css';
import Paper from '../../../components/Paper/Paper';
import Button from '../../../components/Button/Button';
import Chip from '../../../components/Chip/Chip';

export default function FilterBar() {
  return (
    <div className={styles.outerContainer}>
      <Paper withShadow>
        <div className={styles.innerContainer}>
          <h6>Filtered by:</h6>
          <div className={styles.filterChips}>
            <div className={styles.chipContainer}>
              <Chip variant={Chip.VARIANTS.PRIMARY} onDelete>
                At home
              </Chip>
            </div>
            <div className={styles.chipContainer}>
              <Chip variant={Chip.VARIANTS.PRIMARY} onDelete>
                Adams Morgan
              </Chip>
            </div>
            <div className={styles.chipContainer}>
              <Chip variant={Chip.VARIANTS.PRIMARY} onDelete>
                Capitol Hill
              </Chip>
            </div>
            <div className={styles.chipContainer}>
              <Chip variant={Chip.VARIANTS.PRIMARY} onDelete>
                Columbia Heights
              </Chip>
            </div>
          </div>
          <Button variant={Button.VARIANTS.PRIMARY} size={Button.SIZES.SMALL}>
            Add filters
          </Button>
        </div>
      </Paper>
    </div>
  );
}
