import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Button,
  Toolbar,
  AppBar,
  ButtonBase,
  Typography,
  Divider,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Icon,
} from '@material-ui/core';

import ReactGA from 'react-ga';

import CONSTANTS from '../../constants';
import Store from '../../store';
import googleIcon from '../../assets/img/googleIcon.png';
import facebookIcon from '../../assets/img/facebookIcon.png';
import { getIsDesktop } from '../../utils';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  accountDivider: {
    marginLeft: '5px',
    height: '43px',
  },
  headerButton: {
    color: 'black',
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: '1060px',
    width: '100%',
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
  menuList: {
    outline: 'none',
    padding: '0px',
  },
  menuLinkBlack: {
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
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
    height: '50px',
  },
  menuItemOrange: {
    color: theme.palette.primary.main,
    height: '50px',
    fontWeight: 600,
    fontFamily: 'Raleway',
  },
  userButton: {
    paddingLeft: '5px',
    fontWeight: 600,
  },
});

function Header({ classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const store = Store.useStore();
  const user = store.get('user');
  const filters = store.get('filters');
  const focusedDate = store.get('focusedDate');

  const currentTab = store.get('currentTab');
  const setCurrentTab = store.set('currentTab');
  const isFilterPageOpen = store.get('isFilterPageOpen');

  const isDesktop = getIsDesktop();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const goToDiscover = () => {
    setCurrentTab(CONSTANTS.TABS.DISCOVER);
    store.set('filters')([]);
    store.set('focusedDate')(false);
    store.set('isFilterPageOpen')(false);
    window.scrollTo(0, 0);
    ReactGA.pageview(CONSTANTS.TABS.DISCOVER);
  };

  const goToMyDates = () => {
    setCurrentTab(CONSTANTS.TABS.MY_DATES);
    window.scrollTo(0, 0);
    ReactGA.pageview(CONSTANTS.TABS.MY_DATES);
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
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Log Out',
              label: 'Dropdown Menu',
            });
            handleClose();
          }}
        >
          <Link href={CONSTANTS.API.LOGOUT} className={classes.menuLinkBlack}>
            <Icon className={classes.menuIcon}>logout</Icon>{' '}
            <span className={classes.menuItemText}>Log out</span>
          </Link>
        </MenuItem>
      </>
    ) : (
      <>
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
          <Link href={CONSTANTS.API.LOGIN_GOOGLE} className={classes.menuLinkBlack}>
            <img src={googleIcon} alt="Google Icon" className={classes.menuIcon} />
            Log in with Google
          </Link>
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
          <Link href={CONSTANTS.API.LOGIN_FACEBOOK} className={classes.menuLinkBlack}>
            <img src={facebookIcon} alt="Facebook Icon" className={classes.menuIcon} />
            Log in with Facebook
          </Link>
        </MenuItem>
      </>
    );
  };

  return (
    <AppBar position="fixed" color="inherit" className={classes.container}>
      <Toolbar className={classes.toolbar}>
        {!isDesktop &&
          ((focusedDate || filters.length || isFilterPageOpen) &&
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
          ))}
        <ButtonBase className={classes.title} onClick={goToDiscover}>
          BEACON
        </ButtonBase>
        <Box display="flex">
          {isDesktop && (
            <>
              <Button
                color={currentTab === CONSTANTS.TABS.DISCOVER ? 'primary' : ''}
                onClick={goToDiscover}
              >
                <Icon>explore</Icon>
                <span className={classes.userButton}>Discover</span>
              </Button>
              <Button
                color={currentTab === CONSTANTS.TABS.MY_DATES ? 'primary' : ''}
                onClick={goToMyDates}
              >
                <Icon>favorite</Icon>
                <span className={classes.userButton}>My Dates</span>
              </Button>
              <Divider orientation="vertical" className={classes.accountDivider} />
            </>
          )}
          <Button
            size="large"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.headerButton}
          >
            <Icon>person</Icon>{' '}
            {isDesktop && (
              <span className={classes.userButton}>{(user && user.name) || 'Log In'}</span>
            )}
          </Button>
        </Box>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuList className={classes.menuList}>
            {renderUserMenuItems()}
            <MenuItem className={classes.menuItem}>
              <Link
                href="mailto:contact@beacondates.com"
                className={classes.menuLinkBlack}
                target="_blank"
                rel="noopener"
              >
                <Icon className={classes.menuIcon}>email</Icon>{' '}
                <span className={classes.menuItemText}>Contact us</span>
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link
                href="https://forms.gle/ebaqVd2TMTw47RjW8"
                className={classes.menuLinkBlack}
                target="_blank"
                rel="noopener"
              >
                <Icon className={classes.menuIcon}>feedback</Icon>{' '}
                <span className={classes.menuItemText}>Give us Feedback</span>
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItemOrange}>
              <Link
                href="https://forms.gle/6pwD9m24Uz94PFXr8"
                className={classes.menuLink}
                target="_blank"
                rel="noopener"
              >
                <Icon className={classes.menuIcon}>lightbulb_outline</Icon>{' '}
                <span className={classes.menuItemText}>Submit a Date Idea</span>
              </Link>
            </MenuItem>
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
