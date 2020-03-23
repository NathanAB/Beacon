import React from 'react';
import { withStyles, Drawer, MenuList, IconButton, Box, Link, MenuItem } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = {
  drawerLink: {
    color: 'black',
  },
};

function MobileDrawer({ classes, isOpen, close }) {
  return (
    <Drawer open={isOpen} anchor="left" variant="persistent">
      <Box className={classes.drawerHeader}>
        <IconButton onClick={close}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <MenuList className={classes.menuList}>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://about.beacondates.com"
          >
            About Us
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://medium.com/@haris_beacon"
          >
            Blog
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="mailto:contact@beacondates.com"
          >
            Email Us
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://forms.gle/6pwD9m24Uz94PFXr8"
          >
            Submit a Date Idea
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://forms.gle/ebaqVd2TMTw47RjW8"
          >
            Give Us Feedback
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.drawerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/beacon_dates/"
          >
            Our Instagram
          </Link>
        </MenuItem>
      </MenuList>
    </Drawer>
  );
}

export default withStyles(styles)(MobileDrawer);
