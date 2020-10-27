import React from 'react';

import ReactGA from 'react-ga';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import Paper from '../../components/Paper/Paper';
import Pattern4 from '../../assets/graphics/pattern-4.svg';
import BlobOrange from '../../assets/graphics/pink-blob.png';

import styles from './About.module.css';

export default function About() {
  return (
    <PageTemplate>
      <h2>About Us</h2>
      <br />
      <br />
      <section className={styles.narrowSection}>
        <h4>
          <strong>Our Mission</strong>
        </h4>
        <p>
          At Beacon, we believe that spending time together is the key to happiness. We also know
          that it can take a lot of time and energy to plan a date that feels special.
        </p>
        <p>
          Our goal is to make date planning fast and fun. Everyone should spend less time planning
          dates and more time together experiencing them.
        </p>
        <p>
          Our dates are sourced and curated by the people who know best — DC locals. We’re
          constantly updating with a steady flow of new dates to make sure there are always fun and
          fresh ideas at your fingertips.
        </p>
      </section>
      <div className={styles.paperOuter}>
        <img
          className={styles.paperGraphic}
          alt="Playful graphics decorating the stats section"
          src={Pattern4}
        />
        <Paper withShadow>
          <div className={styles.paperInner}>
            <h3>Beacon makes dating easier</h3>
            <div className={styles.paperContent}>
              <div className={styles.paperSection}>
                <h6 className={styles.paperHeader}>REDUCE PLANNING TIME</h6>
                <div className={styles.paperStat}>79%</div>
                <p>of daters that say they spend an average of 20+ minutes planning a date</p>
              </div>
              <div className={styles.paperSection}>
                <h6 className={styles.paperHeader}>INCREASE SATISFACTION</h6>
                <div className={styles.paperStat}>
                  90<span className={styles.paperStatSmall}>MINS</span>
                </div>
                <p>
                  per week of new and exciting activities led to a significant increase in
                  satisfaction
                </p>
              </div>
              <div className={styles.paperSection}>
                <h6 className={styles.paperHeader}>BE HAPPIER TOGETHER</h6>
                <div className={styles.paperStat}>3.5x</div>
                <p>
                  increase of happiness reported by couples who spend time together at least once a
                  week
                </p>
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <div className={styles.quoteBlockContainer}>
        <img
          className={styles.orangeBlob}
          alt="Playful graphics decorating the stats section"
          src={BlobOrange}
        />
        <div className={styles.quoteBlock}>
          <h2>❛❛</h2>
          <h2>Date nights are a necessity for a happy and life-affirming relationship.</h2>
          <br />
          <h4>
            <strong>Dr. Dianne Grande</strong>
          </h4>
          <ReactGA.OutboundLink
            to="https://www.psychologytoday.com/us/blog/in-it-together/201703/date-night-not-luxury-necessity"
            target="_blank"
            rel="noopener noreferrer"
            eventLabel="Dianne Grande Article"
          >
            Read the full article
          </ReactGA.OutboundLink>
        </div>
      </div>
    </PageTemplate>
  );
}
