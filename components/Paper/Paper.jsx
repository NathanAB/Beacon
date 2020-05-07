import React from 'react';

import styles from './Paper.module.css';
import cn from '../../utils/cn';

export default function Paper({ children, transparent, className, ...props }) {
  const classes = [styles.base];
  if (transparent) {
    classes.push(styles.transparent);
  }
  return (
    <div className={cn(...classes, className)} {...props}>
      {children}
    </div>
  );
}
