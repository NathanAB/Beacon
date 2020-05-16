import React from 'react';

import styles from './Button.module.css';
import cn from '../../utils/cn';

function Button({
  children,
  variant = Button.VARIANTS.PRIMARY,
  size = Button.SIZES.SMALL,
  fullWidth,
  disabled,
}) {
  return (
    <button
      type="button"
      className={cn(
        styles.buttonBase,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.VARIANTS = {
  PRIMARY: 'buttonPrimary',
  SECONDARY: 'buttonSecondary',
  OUTLINED: 'buttonOutlined',
};

Button.SIZES = {
  SMALL: 'buttonSmall',
  LARGE: 'buttonLarge',
};

export default Button;
