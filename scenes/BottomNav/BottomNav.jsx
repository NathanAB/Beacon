import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import ReactGA from 'react-ga';

import CONSTANTS from '../../constants';
import Store from '../../store';

const { PAGES, ADMINS } = CONSTANTS;

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
  const user = store.get('user');

  return (
    <BottomNavigation
      // TODO - Use nextjs router.pathname here
      value=""
      showLabels
      onChange={(event, value) => {
        ReactGA.pageview(value);
        store.set('filters')([]);
        store.set('focusedDate')(false);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="Discover"
        value={PAGES.DISCOVER}
        icon={<Icon>explore</Icon>}
      />
      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="My Dates"
        value={PAGES.MY_DATES}
        icon={<Icon>favorite</Icon>}
      />
      {ADMINS.includes(user.email) && window.location.hostname !== 'www.beacondates.com' && (
        <BottomNavigationAction
          classes={{ label: classes.navLabel, root: classes.navItem }}
          label="Admin Mode"
          value={PAGES.ADMIN}
          icon={<Icon>remove_from_queue</Icon>}
        />
      )}
    </BottomNavigation>
  );
}

export default withStyles(styles)(BottomNav);
