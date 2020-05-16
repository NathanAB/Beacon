import React from 'react';
import { Box } from '@material-ui/core';
import Paper from '../../../../components/Paper/Paper';

import styles from './NewDates.module.css';
import DateCardPreview from '../../../../components/DateCardPreview/DateCardPreview';

export default function NewDates() {
  return (
    <div className={styles.cardContainer}>
      <Paper>
        <div className={styles.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="30px"
          >
            <h3>New date ideas added every week</h3>
            <a>Explore all</a>
          </Box>
          <div className={styles.dateCardContainer}>
            <DateCardPreview isNew />
          </div>
          <div className={styles.dateCardContainer}>
            <DateCardPreview />
          </div>
          <div className={styles.dateCardContainer}>
            <DateCardPreview />
          </div>
          <div className={styles.dateCardContainer}>
            <DateCardPreview />
          </div>
        </div>
      </Paper>
    </div>
  );
}
