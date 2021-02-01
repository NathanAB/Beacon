import React from 'react';

import styles from './Paper.module.css';
import cn from '../../utils/cn';

export default function Paper({
  children,
  transparent,
  className,
  fullWidth,
  withShadow,
  noMobile,
  highlighted,
  withHover,
  noBackground,
  noBorder,
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
  if (withHover) {
    classes.push(styles.withHover);
  }
  if (noBackground) {
    classes.push(styles.noBackground);
  }
  if (noMobile) {
    classes.push(styles.noMobile);
  }
  if (highlighted) {
    classes.push(styles.highlighted);
  }
  if (noBorder) {
    classes.push(styles.noBorder);
  }
  return (
    <div className={cn(...classes, className)} {...props}>
      {children}
    </div>
  );
}
