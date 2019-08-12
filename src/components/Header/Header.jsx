import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Typography } from '@material-ui/core';

import Store from '../../store';

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
    justifyContent: 'space-between',
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
    marginRight: '5px',
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const store = Store.useStore();
  const user = store.get('user');

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const { classes } = props;
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.accountButton}>
          <Icon></Icon>
        </IconButton>
        <Button>
          <Typography variant="h5" color="primary" className={classes.title}>
            Beacon
          </Typography>
        </Button>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.accountButton}
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {user ? (
            <>
              <MenuItem>Logged in as {user.displayName}</MenuItem>
              <a href="/logout">
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </a>
            </>
          ) : (
            <a href="/login/google">
              <MenuItem onClick={handleClose}>Login</MenuItem>
            </a>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
