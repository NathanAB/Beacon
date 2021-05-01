import React from 'react';

import styles from './Subscribe.module.css';
import Paper from '../../../../components/Paper/Paper';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';

export default function Subscribe() {
  return (
    <div className={styles.container}>
      <Paper withShadow noMobile>
        <div className={styles.content}>
          <h3 className="text-2xl font-bold">
            Stay up to <i>date</i>
          </h3>
          <div className={styles.subtitle}>
            See what we did there?&nbsp;
            <span role="img" aria-label="Wink Emoji">
              😉
            </span>
          </div>
          <div className={styles.input}>
            <Input placeholder="Your email address" />
          </div>
          <Button size={Button.SIZES.LARGE} variant={Button.VARIANTS.SECONDARY}>
            Sign up for our newsletter
          </Button>
        </div>
      </Paper>
    </div>
  );
}
