import React from 'react';
import InternalLink from 'next/link';
import ReactGA from 'react-ga';

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
          <ReactGA.OutboundLink
            to="https://forms.gle/6pwD9m24Uz94PFXr8"
            target="_blank"
            rel="noopener noreferrer"
            label="Date idea form"
          >
            <Button variant={Button.VARIANTS.PRIMARY} fullWidth>
              Submit a date idea
            </Button>
          </ReactGA.OutboundLink>
        </div>
        <div className={styles.col2}>
          <InternalLink href="/about">
            <a>Learn more about us</a>
          </InternalLink>
          <br />
          <ReactGA.OutboundLink
            to="mailto:contact@beacondates.com"
            target="_blank"
            rel="noopener noreferrer"
            label="Contact email"
          >
            Get in touch with us
          </ReactGA.OutboundLink>
          <br />
          <ReactGA.OutboundLink
            to="https://forms.gle/ebaqVd2TMTw47RjW8"
            target="_blank"
            rel="noopener noreferrer"
            label="Feedback form"
          >
            Give us feedback
          </ReactGA.OutboundLink>
          <br />
          <ReactGA.OutboundLink
            to="https://medium.com/@hannaholin"
            target="_blank"
            rel="noopener noreferrer"
            label="Blog"
          >
            Check out our blog
          </ReactGA.OutboundLink>
          <br />
          <ReactGA.OutboundLink
            to="https://www.instagram.com/beacon_dates/"
            target="_blank"
            rel="noopener noreferrer"
            label="Instagram"
          >
            Follow us on Instagram
          </ReactGA.OutboundLink>
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
