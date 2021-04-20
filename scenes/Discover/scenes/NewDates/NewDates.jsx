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
      <Paper noBorder noBackground noMobile>
        <div className={styles.cardContent}>
          <div className="flex mb-7 flex-column items-center justify-center flex-wrap sm:flex-row sm:justify-between">
            <h3>New date ideas for {new Date().toLocaleString('default', { month: 'long' })}</h3>
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
          </div>
          <div className={styles.dateCardsContainer}>
            {dateObjs.map(dateObj => (
              <div key={dateObj.id} className={styles.dateCardContainer}>
                <DateCard isNew dateObj={dateObj} variant={DateCard.VARIANTS.PREVIEW} />
              </div>
            ))}
          </div>
          <div className="sm:text-right">
            <InternalLink href="/search">
              <a
                onClick={() =>
                  ReactGA.event({
                    category: 'Interaction',
                    action: 'Click Explore All',
                  })
                }
                className={`link ${isMobile && 'center'}`}
              >
                Explore all
              </a>
            </InternalLink>
          </div>
        </div>
      </Paper>
    </div>
  );
}
