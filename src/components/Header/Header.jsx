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
import MenuList from '@material-ui/core/MenuList';
import { Typography, Divider } from '@material-ui/core';

import CONSTANTS from '../../constants';
import Store from '../../store';
import googleIcon from '../../assets/img/googleIcon.png';
import facebookIcon from '../../assets/img/facebookIcon.png';

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
  icon: {
    height: '25px',
    marginRight: '5px',
  },
  loginIcon: {
    height: '32px',
    marginRight: '8px',
  },
  logo: {
    height: '18px',
  },
  title: {
    fontWeight: 800,
    letterSpacing: '5px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '28px',
      letterSpacing: '6px',
    },
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

  const goToDiscover = () => {
    store.set('currentTab')(CONSTANTS.TABS.DISCOVER);
    store.set('filters')([]);
    store.set('focusedDate')(false);
    store.set('isFilterPageOpen')(false);
  };

  const { classes } = props;
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.accountButton}>
          <Icon></Icon>
        </IconButton>
        <Button>
          <Typography variant="h5" color="primary" className={classes.title} onClick={goToDiscover}>
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
            <MenuList>
              <MenuItem disabled>
                <Typography variant="subtitle1">
                  Logged in as {user.name || ''} <br /> ({user.email || ''})
                </Typography>
              </MenuItem>
              <Divider />
              <a href={CONSTANTS.API.LOGOUT}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </a>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem
                onClick={() => {
                  window.location = CONSTANTS.API.LOGIN_GOOGLE;
                }}
              >
                <img src={googleIcon} alt="Google Icon" className={classes.loginIcon} />
                Login with Google
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location = CONSTANTS.API.LOGIN_FACEBOOK;
                }}
              >
                <img src={facebookIcon} alt="Facebook Icon" className={classes.loginIcon} />
                Login with Facebook
              </MenuItem>
            </MenuList>
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
