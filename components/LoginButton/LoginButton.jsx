import React from 'react';
import ReactGA from 'react-ga';

import constants from '../../constants';

import styles from './LoginButton.module.css';

import GoogleIcon from '../../assets/img/googleIcon.png';
import FacebookIcon from '../../assets/img/facebook-logo-white.svg';

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
  const currentUrl = window.location.href;
  const redirectUrl = `${data.href}?redirectUrl=${encodeURIComponent(currentUrl)}`;
  const onClick = () => {
    sessionStorage.setItem(constants.FLAGS.FRESH_LOGIN, true);
    ReactGA.event({
      category: 'Interaction',
      action: 'Click Login Button',
    });
  };
  return (
    <ReactGA.OutboundLink
      to={redirectUrl}
      eventLabel={`${data.name} Login Clicked`}
      className={`${styles.link} ${styles[type]}`}
      onClick={onClick}
    >
      <img className={styles.icon} alt={`${data.name} Logo`} src={data.icon} />
      Log in with {data.name}
    </ReactGA.OutboundLink>
  );
}
