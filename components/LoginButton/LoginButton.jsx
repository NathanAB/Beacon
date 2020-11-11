import React from 'react';
import ReactGA from 'react-ga';
import Image from 'next/image';

import constants from '../../constants';

import styles from './LoginButton.module.css';

const typeData = {
  google: {
    href: constants.API.LOGIN_GOOGLE,
    icon: '/assets/img/googleIcon.png',
    name: 'Google',
  },
  facebook: {
    href: constants.API.LOGIN_FACEBOOK,
    icon: '/assets/img/facebook-logo-white.png',
    name: 'Facebook',
  },
};

export default function LoginButton({ type }) {
  const data = typeData[type];
  return (
    <ReactGA.OutboundLink
      to={data.href}
      eventLabel={`${data.name} Login Clicked`}
      className={`${styles.link} ${styles[type]}`}
      onClick={() => sessionStorage.setItem(constants.FLAGS.FRESH_LOGIN, true)}
    >
      <Image
        width="30px"
        height="30px"
        className={styles.icon}
        alt={`${data.name} Logo`}
        src={data.icon}
      />
      Log in with {data.name}
    </ReactGA.OutboundLink>
  );
}
