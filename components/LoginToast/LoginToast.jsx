import React from 'react';
import InternalLink from 'next/link';

import BeaconGem from '../../assets/graphics/beacon-gem.svg';

export default function LoginToast({ firstName }) {
  return (
    <>
      <h6>
        <img
          src={BeaconGem}
          alt="Beacon Logo"
          style={{ width: '13px', height: '16px', marginRight: '9px' }}
        />
        {`Welcome, ${firstName}!`}
      </h6>
      <p>
        Check out your <InternalLink href="/saved">saved dates.</InternalLink>
      </p>
    </>
  );
}
