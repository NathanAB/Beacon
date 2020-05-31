import React from 'react';
import { Box } from '@material-ui/core';
import Paper from '../../../../components/Paper/Paper';

import styles from './NewDates.module.css';
import DateCard from '../../../../components/DateCard/DateCard';
import { useMobile } from '../../../../utils';

export default function NewDates({ dateObjs }) {
  const isMobile = useMobile();
  return (
    <div className={styles.cardContainer}>
      <Paper withShadow noMobile>
        <div className={styles.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
            marginBottom="30px"
          >
            <h3>New date ideas added every week</h3>
            {!isMobile && <a>Explore all</a>}
          </Box>
          <div className={styles.dateCardsContainer}>
            {dateObjs.map(dateObj => (
              <div className={styles.dateCardContainer}>
                <DateCard isNew dateObj={dateObj} variant={DateCard.VARIANTS.PREVIEW} />
              </div>
            ))}
          </div>
          {isMobile && <a>Explore all</a>}
        </div>
      </Paper>
    </div>
  );
}
