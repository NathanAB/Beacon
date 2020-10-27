import React from 'react';
import { Box } from '@material-ui/core';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';

import styles from './NewDates.module.css';
import Pattern3 from '../../../../assets/graphics/pattern-3.svg';
import Paper from '../../../../components/Paper/Paper';
import DateCard from '../../../../components/DateCard/DateCard';
import { useMobile } from '../../../../utils';

export default function NewDates({ dateObjs }) {
  const isMobile = useMobile();
  return (
    <div className={styles.cardContainer}>
      <img
        alt="A playful pattern of hearts, crosses and circles."
        className={styles.pattern}
        src={Pattern3}
      />
      <Paper withShadow noMobile>
        <div className={styles.cardContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
            marginBottom="30px"
          >
            <h3>New date ideas for {new Date().toLocaleString('default', { month: 'long' })}</h3>
            {!isMobile && (
              <InternalLink href="/search">
                <a
                  onClick={() =>
                    ReactGA.event({
                      category: 'Interaction',
                      action: 'Click Explore All',
                    })
                  }
                  className="link"
                >
                  Explore all
                </a>
              </InternalLink>
            )}
          </Box>
          <div className={styles.dateCardsContainer}>
            {dateObjs.map(dateObj => (
              <div key={dateObj.id} className={styles.dateCardContainer}>
                <DateCard isNew dateObj={dateObj} variant={DateCard.VARIANTS.PREVIEW} />
              </div>
            ))}
          </div>
          {isMobile && (
            <InternalLink href="/search">
              <a
                onClick={() =>
                  ReactGA.event({
                    category: 'Interaction',
                    action: 'Click Explore All',
                  })
                }
                className="link"
              >
                Explore all
              </a>
            </InternalLink>
          )}
        </div>
      </Paper>
    </div>
  );
}
