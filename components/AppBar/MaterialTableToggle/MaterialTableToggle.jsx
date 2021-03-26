import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

function MaterialTableToggle({ data, onClick }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={data}
            color="primary"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onClick();
            }}
          />
        }
        label={data ? 'Yes' : 'No'}
      />
    </FormGroup>
  );
}

export default MaterialTableToggle;
