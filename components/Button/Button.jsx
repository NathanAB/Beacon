import React from 'react';

import styles from './Button.module.css';
import cn from '../../utils/cn';

function Button({
  children,
  variant = Button.VARIANTS.PRIMARY,
  size = Button.SIZES.SMALL,
  fullWidth,
  disabled,
  onClick,
  onSubmit,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={cn(
        styles.buttonBase,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
      )}
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
}

Button.VARIANTS = {
  PRIMARY: 'buttonPrimary',
  SECONDARY: 'buttonSecondary',
  OUTLINED: 'buttonOutlined',
  BORDERLESS: 'buttonBorderless',
};

Button.SIZES = {
  MICRO: 'buttonMicro',
  SMALL: 'buttonSmall',
  LARGE: 'buttonLarge',
};

export default Button;
