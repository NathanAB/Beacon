import React from 'react';
import Button from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Buttons = () =>
  Object.values(Button.VARIANTS).map(variant =>
    Object.values(Button.SIZES).map(size => (
      <>
        <span style={{ margin: '10px', display: 'inline-block' }}>
          <Button variant={variant} size={size}>
            Submit a date idea
          </Button>
        </span>
        <span style={{ margin: '10px', display: 'inline-block' }}>
          <Button variant={variant} size={size} disabled>
            Submit a date idea
          </Button>
        </span>
      </>
    )),
  );
