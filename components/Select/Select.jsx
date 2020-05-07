import React from 'react';

import Select from 'react-select';

// Global css since this is a 3rd party component
import './Select.css';

function Button({ children, ...props }) {
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
    <Select theme={customTheme} classNamePrefix="react-select" {...props}>
      {children}
    </Select>
  );
}

export default Button;
