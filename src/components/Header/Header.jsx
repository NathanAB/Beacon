import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import { Typography } from '@material-ui/core';
import logo from './logo.png';
import icon from './icon.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  accountButton: {
    marginRight: theme.spacing(1),
  },
  toolbar: {
    'justify-content': 'space-between',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  icon: {
    height: '25px',
    'margin-right': '5px',
  },
  logo: {
    height: '18px',
  },
  title: {
    fontWeight: 800,
    letterSpacing: '0.3rem',
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="contrastText">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.accountButton}>
          <Icon>settings</Icon>
        </IconButton>
        <Button>
          <Typography variant="h5" color="primary" className={classes.title}>
            Beacon
          </Typography>
        </Button>
        <IconButton className={classes.accountButton}>
          <Icon>account_circle</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
