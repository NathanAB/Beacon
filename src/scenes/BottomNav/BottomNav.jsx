import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import './BottomNav.css';
import CONSTANTS from '../../constants';
import Store from '../../store';

const { TABS } = CONSTANTS;

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
  },
};

function BottomNav({ classes }) {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');

  return (
    <BottomNavigation
      value={currentTab}
      onChange={(event, value) => {
        store.set('currentTab')(value);
        store.set('filters')([]);
        store.set('focusedDate')(false);
      }}
      className={classes.root}
    >
      <BottomNavigationAction label="Discover" value={TABS.DISCOVER} icon={<Icon>explore</Icon>} />
      <BottomNavigationAction label="My Dates" value={TABS.MY_DATES} icon={<Icon>favorite</Icon>} />
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
