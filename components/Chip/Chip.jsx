import React from 'react';

import styles from './Chip.module.css';
import cn from '../../utils/cn';

export default function Chip({
  children,
  variant = Chip.VARIANTS.SECONDARY,
  onDelete,
  onClick,
  disabled = false,
}) {
  const classes = cn(
    styles.container,
    styles[variant],
    onClick ? styles.clickable : styles.notClickable,
    disabled ? styles.disabled : '',
  );
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
      {onDelete && (
        <button type="button" className={styles.deleteButton} onClick={onDelete}>
          ✕
        </button>
      )}
    </button>
  );
}

Chip.VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};
