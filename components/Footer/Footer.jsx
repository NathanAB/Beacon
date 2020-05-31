import React from 'react';

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
            A little blurb about Beacon and the value it provides. Blah, blah blah blah, blah. Zim
            zam, zooph. Don’t boss me around. One more sentence. Submit your idea and it might be
            featured on our homepage!
          </p>
          <Button variant={Button.VARIANTS.PRIMARY} fullWidth>
            Submit a date idea
          </Button>
        </div>
        <div className={styles.col2}>
          <a>Learn more about us</a>
          <br />
          <a>Get in touch with us</a>
          <br />
          <a>Give us feedback</a>
          <br />
          <a>Check out our blog</a>
          <br />
          <a>Follow us on Instagram</a>
        </div>
        <div className={styles.col3}>
          <div>
            <a>Terms of use</a>
            <br />
            <a>Privacy policy</a>
            <br />
            <a>Cookie notice</a>
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
