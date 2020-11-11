import React from 'react';
import InternalLink from 'next/link';
import Image from 'next/image';

export default function LoginToast({ firstName }) {
  return (
    <>
      <h6>
        <Image
          src="/assets/graphics/beacon-gem.svg"
          alt="Beacon Logo"
          width="13px"
          height="16px"
          style={{ marginRight: '9px' }}
        />
        {`Welcome, ${firstName}!`}
      </h6>
      <p>
        Check out your <InternalLink href="/saved">saved dates.</InternalLink>
      </p>
    </>
  );
}
