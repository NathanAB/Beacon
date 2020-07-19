import React, { useState } from 'react';
import Select from '../components/Select/Select';

export default {
  title: 'Select',
  component: Select,
};

const options = [
  {
    value: 'Adams Morgan',
    label: 'Adams Morgan',
  },
  {
    value: 'Dupont Circle',
    label: 'Dupont Circle',
  },
  {
    value: 'Georgetown',
    label: 'Georgetown',
  },
];

export const Selects = () => {
  const [selected, setSelected] = useState();
  const [selected2, setSelected2] = useState();
  return (
    <>
      <div style={{ margin: '20px', width: '500px' }}>
        <Select value={selected} onChange={setSelected} options={options} />
      </div>
      <div style={{ margin: '20px', width: '500px' }}>
        <Select
          value={selected2}
          onChange={setSelected2}
          options={options}
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
    </>
  );
};
