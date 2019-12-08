import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CONSTANTS from '../../constants';
import Store from '../../store';

const { TABS } = CONSTANTS;

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
  },
  navItem: {
    color: 'black',
  },
  navLabel: {
    fontSize: '16px !important',
    fontWeight: '600',
    fontFamily: 'Raleway',
  },
};

function BottomNav({ classes }) {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');

  return (
    <BottomNavigation
      value={currentTab}
      showLabels
      onChange={(event, value) => {
        ReactGA.pageview(value);
        store.set('filters')([]);
        store.set('focusedDate')(false);
      }}
      className={classes.root}
    >
      <Link to="/discover">
        <BottomNavigationAction
          classes={{ label: classes.navLabel, root: classes.navItem }}
          label="Discover"
          value={TABS.DISCOVER}
          icon={<Icon>explore</Icon>}
        />
      </Link>
      <Link to="/my-dates">
        <BottomNavigationAction
          classes={{ label: classes.navLabel, root: classes.navItem }}
          label="My Dates"
          value={TABS.MY_DATES}
          icon={<Icon>favorite</Icon>}
        />
      </Link>
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
