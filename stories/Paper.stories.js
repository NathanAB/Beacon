import React, { useState } from 'react';
import Paper from '../components/Paper/Paper';

export default {
  title: 'Paper',
  component: Paper,
};

export const Papers = () => {
  return (
    <div style={{ backgroundColor: 'pink' }}>
      <div style={{ margin: '20px', width: '500px' }}>
        <Paper>
          <div style={{ padding: '50px' }}>This is a paper.</div>{' '}
        </Paper>
      </div>
      <div style={{ margin: '20px', width: '500px' }}>
        <Paper transparent>
          <div style={{ padding: '50px' }}>This is a paper.</div>
        </Paper>
      </div>
    </div>
  );
};
