import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import Link from 'next/link';
import { useRouter } from 'next/router';
import CONSTANTS from '../../constants';

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
    fontFamily: 'Playfair Display',
  },
};

function BottomNav({ classes }) {
  const router = useRouter();

  const handleChange = (event, newValue) => {
    router.push(newValue).then(() => window.scrollTo(0, 0));
  };

  return (
    <BottomNavigation
      value={router.pathname}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="Discover"
        value={PAGES.DISCOVER}
        icon={<Icon>explore</Icon>}
      ></BottomNavigationAction>

      <BottomNavigationAction
        classes={{ label: classes.navLabel, root: classes.navItem }}
        label="My Dates"
        value={PAGES.MY_DATES}
        icon={<Icon>favorite</Icon>}
      />
    </BottomNavigation>
  );
}

export default withStyles(styles)(BottomNav);
