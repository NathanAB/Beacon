import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InternalLink from 'next/link';
import {
  Box,
  IconButton,
  Button,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Icon,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import ReactGA from 'react-ga';

import CONSTANTS from '../../constants';
import Store from '../../store';
import googleIcon from '../../assets/img/googleIcon.png';
import facebookIcon from '../../assets/img/facebookIcon.png';
import { useDesktop } from '../../utils';
import MobileDrawer from '../../components/MobileDrawer/MobileDrawer';
import HeaderLink from './components/HeaderLink/HeaderLink';

const { ADMINS } = CONSTANTS;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  accountDivider: {
    margin: '0 5px',
    height: '43px',
    width: '1px',
  },
  headerButton: {
    color: 'black',
    minWidth: '48px',
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: '1600px',
    left: '0px',
    right: '0px',
    margin: 'auto',
  },
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: '1060px',
    width: '100%',
    padding: '0px 8px',
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
  const [isDrawerOpen, setDrawerOpen] = React.useState(null);
  const store = Store.useStore();
  const user = store.get('user');
  const setIsLoginOpen = store.set('isLoginDialogOpen');

  const isDesktop = useDesktop();

  function login(event) {
    if (!user.email) {
      setIsLoginOpen(true);
      return;
    }
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const goToDiscover = () => {
    store.set('filters')([]);
    store.set('focusedDate')(false);
    ReactGA.pageview(CONSTANTS.PAGES.DISCOVER);
  };

  const goToMyDates = () => {
    ReactGA.pageview(CONSTANTS.PAGES.MY_DATES);
  };

  const goToAdmin = () => {
    ReactGA.pageview(CONSTANTS.PAGES.ADMIN);
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
      <MobileDrawer isOpen={isDrawerOpen} close={() => setDrawerOpen(false)} />
      <Toolbar className={classes.toolbar}>
        {!isDesktop && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <InternalLink href="/">
          <a
            className={classes.title}
            onClick={goToDiscover}
            onKeyPress={e => e.keyCode === 13 && goToDiscover()}
          >
            BEACON
          </a>
        </InternalLink>
        <Box display="flex" alignItems="center">
          {isDesktop && (
            <>
              <HeaderLink
                path={CONSTANTS.PAGES.DISCOVER}
                text="Discover"
                icon="explore"
                onClick={goToDiscover}
              />
              <HeaderLink
                path={CONSTANTS.PAGES.MY_DATES}
                text="My Dates"
                icon="favorite"
                onClick={goToMyDates}
              />
              {isDesktop &&
                ADMINS.includes(user.email) &&
                window.location.hostname !== 'www.beacondates.com' && (
                  <HeaderLink
                    path={CONSTANTS.PAGES.ADMIN}
                    text="Admin"
                    icon="remove_from_queue"
                    onClick={goToAdmin}
                  />
                )}
              <Divider orientation="vertical" className={classes.accountDivider} />
            </>
          )}
          <HeaderLink
            path=""
            text={isDesktop && ((user && user.name) || 'Log In')}
            icon="person"
            onClick={login}
          />
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

export default withStyles(styles)(Header);
