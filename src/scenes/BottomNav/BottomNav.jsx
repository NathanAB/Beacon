import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import ReactGA from 'react-ga';

import CONSTANTS from '../../constants';
import Store from '../../store';

const { TABS, ADMINS } = CONSTANTS;

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    borderTop: '1px solid lightgray',
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
  const user = store.get('user');

  return (
    <BottomNavigation
      value={currentTab}
      showLabels
      onChange={(event, value) => {
        ReactGA.pageview(value);
        store.set('currentTab')(value);
        store.set('filters')([]);
        store.set('focusedDate')(false);
        store.set('isFilterPageOpen')(false);
        window.scrollTo(0, 0);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="Discover"
        value={TABS.DISCOVER}
        icon={<Icon>explore</Icon>}
      />
      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="My Dates"
        value={TABS.MY_DATES}
        icon={<Icon>favorite</Icon>}
      />
      {ADMINS.includes(user.email) && window.location.hostname !== 'www.beacondates.com' && (
        <BottomNavigationAction
          classes={{ label: classes.navLabel, root: classes.navItem }}
          label="Admin Mode"
          value={TABS.ADMIN}
          icon={<Icon>remove_from_queue</Icon>}
        />
      )}
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
