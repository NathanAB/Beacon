import React from 'react';

import Select from 'react-select';

function Button({ children, size = 'large', ...props }) {
  const customTheme = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#f15f3a',
      primary75: '#FFC6AF',
      primary50: '#FFC6AF',
      primary25: '#FFC6AF',
    },
  });
  return (
    <Select
      theme={customTheme}
      classNamePrefix={size === 'large' ? 'react-select' : 'react-select-small'}
      {...props}
    >
      {children}
    </Select>
  );
}

export default Button;
