import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InternalLink from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Icon } from '@material-ui/core';

const styles = theme => ({
  activeLink: {
    color: theme.palette.primary.main,
  },
  link: {
    verticalAlign: 'middle',
    '&:hover': {
      color: theme.palette.primary.main,
      transition: '0.15s',
    },
    transition: '0.15s',
    margin: '0 6px',
  },
  linkText: {
    verticalAlign: 'middle',
  },
  userButton: {
    paddingLeft: '5px',
    fontWeight: 600,
  },
});

const HeaderLink = ({ classes, onClick, path, text, icon }) => {
  const router = useRouter();
  const linkClasses = [classes.link];

  if (router.pathname === path) {
    linkClasses.push(classes.activeLink);
  }

  return (
    <InternalLink href={path}>
      <a onClick={onClick}>
        <Typography variant="subtitle2" className={linkClasses.join(' ')}>
          <Icon className={classes.linkText}>{icon}</Icon>
          <span className={classes.userButton}>{text}</span>
        </Typography>
      </a>
    </InternalLink>
  );
};

export default withStyles(styles)(HeaderLink);
