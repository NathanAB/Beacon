import React from 'react';

import styles from './Chip.module.css';
import cn from '../../utils/cn';

export default function Chip({ children, variant = Chip.VARIANTS.SECONDARY }) {
  const classes = cn(styles.container, styles[variant]);
  return <div className={classes}>{children}</div>;
}

Chip.VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};
