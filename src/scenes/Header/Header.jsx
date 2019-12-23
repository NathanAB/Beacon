import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { ButtonBase, Typography, Divider, Link, Menu, MenuItem, MenuList } from '@material-ui/core';

import ReactGA from 'react-ga';

import CONSTANTS from '../../constants';
import Store from '../../store';
import googleIcon from '../../assets/img/googleIcon.png';
import facebookIcon from '../../assets/img/facebookIcon.png';
import constants from '../../constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headerButton: {
    color: 'black',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  loginIcon: {
    height: '32px',
    marginRight: '8px',
  },
  logo: {
    height: '52px',
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: 'sofia-pro, sans-serif',
    fontWeight: 900,
    letterSpacing: '5px',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.8,
    },
    fontSize: '28px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '32px',
      letterSpacing: '6px',
    },
  },
  menuItem: {
    fontWeight: 600,
    fontFamily: 'Raleway',
  },
});

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const store = Store.useStore();
  const user = store.get('user');
  const filters = store.get('filters');
  const focusedDate = store.get('focusedDate');
  const currentTab = store.get('currentTab');
  const isFilterPageOpen = store.get('isFilterPageOpen');

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const goToDiscover = () => {
    ReactGA.pageview(CONSTANTS.TABS.DISCOVER);
    store.set('currentTab')(CONSTANTS.TABS.DISCOVER);
    store.set('filters')([]);
    store.set('focusedDate')(false);
    store.set('isFilterPageOpen')(false);
    window.scrollTo(0, 0);
  };

  const { classes } = props;
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className={classes.toolbar}>
        {(focusedDate || filters.length || isFilterPageOpen) &&
        currentTab !== constants.TABS.MY_DATES ? (
          <IconButton
            className={classes.headerButton}
            onClick={() => {
              store.set('focusedDate')(false);
              store.set('filters')([]);
              store.set('isFilterPageOpen')(false);
            }}
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        ) : (
          <IconButton className={classes.headerButton}>
            <Icon></Icon>
          </IconButton>
        )}
        <ButtonBase className={classes.title} onClick={goToDiscover}>
          BEACON
        </ButtonBase>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.headerButton}
        >
          <Icon>person</Icon>
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
                <Typography variant="subtitle1" className={classes.menuItem}>
                  Logged in as {user.name || ''} <br /> ({user.email || ''})
                </Typography>
              </MenuItem>
              <Divider />
              <Link href={CONSTANTS.API.LOGOUT}>
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    ReactGA.event({
                      category: 'Interaction',
                      action: 'Logout',
                      label: 'Dropdown Menu',
                    });
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Link>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem
                className={classes.menuItem}
                onClick={() => {
                  ReactGA.event({
                    category: 'Interaction',
                    action: 'Login with Google',
                    label: 'Dropdown Menu',
                  });
                  window.location = CONSTANTS.API.LOGIN_GOOGLE;
                }}
              >
                <img src={googleIcon} alt="Google Icon" className={classes.loginIcon} />
                Login with Google
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={() => {
                  ReactGA.event({
                    category: 'Interaction',
                    action: 'Login with Facebook',
                    label: 'Dropdown Menu',
                  });
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
