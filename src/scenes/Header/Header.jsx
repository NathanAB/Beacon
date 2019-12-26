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
  menuItemText: {
    verticalAlign: 'middle',
  },
  menuIcon: {
    maxHeight: '32px',
    marginRight: '8px',
    verticalAlign: 'middle',
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
  menuLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  menuItem: {
    fontWeight: 600,
    fontFamily: 'Raleway',
    color: 'black',
  },
  menuItemOrange: {
    fontWeight: 600,
    fontFamily: 'Raleway',
  },
});

function Header({ classes }) {
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

  const renderUserMenuItems = () => {
    return user ? (
      <>
        <MenuItem disabled>
          <Typography variant="subtitle1" className={classes.menuItem}>
            Logged in as {user.name || ''} <br /> ({user.email || ''})
          </Typography>
        </MenuItem>
        <Divider />
        <Link href={CONSTANTS.API.LOGOUT} className={classes.menuLink}>
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
            <Icon className={classes.menuIcon}>logout</Icon>{' '}
            <span className={classes.menuItemText}>Logout</span>
          </MenuItem>
        </Link>
      </>
    ) : (
      <>
        <Link href={CONSTANTS.API.LOGIN_GOOGLE} className={classes.menuLink}>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              ReactGA.event({
                category: 'Interaction',
                action: 'Login with Google',
                label: 'Dropdown Menu',
              });
            }}
          >
            <img src={googleIcon} alt="Google Icon" className={classes.menuIcon} />
            Login with Google
          </MenuItem>
        </Link>
        <Link href={CONSTANTS.API.LOGIN_FACEBOOK} className={classes.menuLink}>
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
            <img src={facebookIcon} alt="Facebook Icon" className={classes.menuIcon} />
            Login with Facebook
          </MenuItem>
        </Link>
      </>
    );
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className={classes.toolbar}>
        {(focusedDate || filters.length || isFilterPageOpen) &&
        currentTab !== CONSTANTS.TABS.MY_DATES ? (
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
          <MenuList>
            {renderUserMenuItems()}
            <Link
              href="mailto:contact@beacondates.com"
              className={classes.menuLink}
              target="_blank"
              rel="noopener"
            >
              <MenuItem className={classes.menuItem}>
                <Icon className={classes.menuIcon}>email</Icon>{' '}
                <span className={classes.menuItemText}>Contact us</span>
              </MenuItem>
            </Link>
            <Link
              href="https://forms.gle/ebaqVd2TMTw47RjW8"
              className={classes.menuLink}
              target="_blank"
              rel="noopener"
            >
              <MenuItem className={classes.menuItem}>
                <Icon className={classes.menuIcon}>feedback</Icon>{' '}
                <span className={classes.menuItemText}>Give us Feedback</span>
              </MenuItem>
            </Link>
            <Link
              href="https://forms.gle/6pwD9m24Uz94PFXr8"
              className={classes.menuLink}
              target="_blank"
              rel="noopener"
            >
              <MenuItem className={classes.menuItemOrange}>
                <Icon className={classes.menuIcon}>lightbulb_outline</Icon>{' '}
                <span className={classes.menuItemText}>Submit a Date Idea</span>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
