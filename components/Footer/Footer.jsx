import React from 'react';
import InternalLink from 'next/link';

import styles from './Footer.module.css';
import Button from '../Button/Button';
import BeaconTitle from '../BeaconTitle/BeaconTitle';

export default function Footer() {
  return (
    <div className={styles.container}>
      <BeaconTitle />
      <div className={styles.innerContainer}>
        <div className={styles.col1}>
          <p className={styles.blurb}>
            We built Beacon so daters of all kinds can find or craft the perfect date plans while
            discovering exciting and new local spots. Submit your idea and it might be featured on
            our homepage!
          </p>
          <a href="https://forms.gle/6pwD9m24Uz94PFXr8" target="_blank" rel="noopener noreferrer">
            <Button variant={Button.VARIANTS.PRIMARY} fullWidth>
              Submit a date idea
            </Button>
          </a>
        </div>
        <div className={styles.col2}>
          <a href="https://about.beacondates.com/" target="_blank" rel="noopener noreferrer">
            Learn more about us
          </a>
          <br />
          <a href="mailto:contact@beacondates.com" target="_blank" rel="noopener noreferrer">
            Get in touch with us
          </a>
          <br />
          <a href="https://forms.gle/ebaqVd2TMTw47RjW8" target="_blank" rel="noopener noreferrer">
            Give us feedback
          </a>
          <br />
          <a href="https://medium.com/@hannaholin" target="_blank" rel="noopener noreferrer">
            Check out our blog
          </a>
          <br />
          <a
            href="https://www.instagram.com/beacon_dates/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Instagram
          </a>
        </div>
        <div className={styles.col3}>
          <div>
            <InternalLink href="/terms">
              <a>Terms of use</a>
            </InternalLink>
            <br />
            <InternalLink href="/privacy">
              <a>Privacy policy</a>
            </InternalLink>
          </div>
          <div className={styles.copyright}>
            © 2020 Beacon
            <br />
            All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
