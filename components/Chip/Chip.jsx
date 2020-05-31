import React from 'react';

import styles from './Chip.module.css';
import cn from '../../utils/cn';

export default function Chip({ children, variant = Chip.VARIANTS.SECONDARY, onDelete }) {
  const classes = cn(styles.container, styles[variant]);
  return (
    <div className={classes}>
      {children}
      {onDelete && (
        <button type="button" className={styles.deleteButton} onClick={onDelete}>
          ✕
        </button>
      )}
    </div>
  );
}

Chip.VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};
