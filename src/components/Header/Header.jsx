import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import logo from '../../assets/img/logo.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 1,
  },
  accountButton: {
    marginRight: theme.spacing.unit * 1,
  },
  toolbar: {
    'justify-content': 'space-between',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  logo: { width: '150px' },
});

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="white">
      <Toolbar className={classes.toolbar}>
        <Button>
          <img alt="DateSpotter Logo" src={logo} className={classes.logo} />
        </Button>
        <IconButton color="primary" className={classes.accountButton}>
          {/* <AccountCircle /> */}
          <Icon>shopping_cart</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
