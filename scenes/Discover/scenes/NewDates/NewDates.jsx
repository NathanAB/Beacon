import React from 'react';
import { Box } from '@material-ui/core';
import Paper from '../../../../components/Paper/Paper';

import styles from './NewDates.module.css';
import DateCardPreview from '../../../../components/DateCardPreview/DateCardPreview';

export default function NewDates({ dateObjs }) {
  return (
    <div className={styles.cardContainer}>
      <Paper withShadow>
        <div className={styles.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
            marginBottom="30px"
          >
            <h3>New date ideas added every week</h3>
            <a>Explore all</a>
          </Box>
          <div className={styles.dateCardsContainer}>
            {dateObjs.map(dateObj => (
              <div className={styles.dateCardContainer}>
                <DateCardPreview isNew dateObj={dateObj} />
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
}
