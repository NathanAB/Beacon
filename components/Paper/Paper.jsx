import React from 'react';

import styles from './Paper.module.css';
import cn from '../../utils/cn';

export default function Paper({
  children,
  transparent,
  className,
  fullWidth,
  withShadow,
  ...props
}) {
  const classes = [styles.base];
  if (transparent) {
    classes.push(styles.transparent);
  }
  if (withShadow) {
    classes.push(styles.withShadow);
  }
  if (fullWidth) {
    classes.push(styles.fullWidth);
  }
  return (
    <div className={cn(...classes, className)} {...props}>
      {children}
    </div>
  );
}
