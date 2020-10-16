import React from 'react';
import ReactGA from 'react-ga';

import constants from '../../constants';

import styles from './LoginButton.module.css';

import GoogleIcon from '../../assets/img/googleIcon.png';
import FacebookIcon from '../../assets/img/fb-circular.png';

const typeData = {
  google: {
    href: constants.API.LOGIN_GOOGLE,
    icon: GoogleIcon,
    name: 'Google',
  },
  facebook: {
    href: constants.API.LOGIN_FACEBOOK,
    icon: FacebookIcon,
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
    >
      <img className={styles.icon} alt={`${data.name} Logo`} src={data.icon} />
      Log in with {data.name}
    </ReactGA.OutboundLink>
  );
}
