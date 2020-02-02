// About
// Contact
// Blog
// Submit a date idea
// Give us feedback
// Sign up for the Newsletter

import React from 'react';
import { Box, Button, Typography, Link, withStyles, Input, TextField } from '@material-ui/core';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url =
  'https://beacondates.us4.list-manage.com/subscribe/post?u=004fa114757b8134c34c5f7d1&amp;id=a96536c7f6';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.dark,
  },
  footerLink: {
    display: 'block',
    marginBottom: '10px',
  },
  title: {
    color: theme.palette.primary.contrastText,
    display: 'inline-block',
    marginBottom: '5px',
    fontFamily: 'sofia-pro, sans-serif',
    fontWeight: 900,
    letterSpacing: '5px',
    fontSize: '28px',
  },
  subscribeInput: {
    backgroundColor: theme.palette.secondary.text,
    borderRadius: '5px',
    marginBottom: '10px',
  },
});

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      {/* <Container> */}
      <Box
        maxWidth="1050px"
        padding="50px"
        className={classes.container}
        display="flex"
        justifyContent="space-between"
        margin="auto"
      >
        {/* <Typography variant="h6">About</Typography> */}
        <Box>
          <span className={classes.title}>BEACON</span>
          <Typography variant="subtitle2" color="secondary">
            contact@beacondates.com
          </Typography>
        </Box>
        <Box>
          <Link
            className={classes.footerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://beacondates.com"
            gutterBottom
          >
            About Us
          </Link>
          <Link
            className={classes.footerLink}
            gutterBottom
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://medium.com/@haris_beacon"
          >
            Blog
          </Link>
          <Link
            className={classes.footerLink}
            gutterBottom
            color="secondary"
            target="_blank"
            rel="noopener"
            href="mailto:contact@beacondates.com"
          >
            Email Us
          </Link>
        </Box>
        <Box>
          <Link
            className={classes.footerLink}
            gutterBottom
            color="secondary"
            href="https://forms.gle/6pwD9m24Uz94PFXr8"
            target="_blank"
            rel="noopener"
          >
            Submit a Date Idea
          </Link>
          <Link
            className={classes.footerLink}
            gutterBottom
            color="secondary"
            href="https://forms.gle/ebaqVd2TMTw47RjW8"
            target="_blank"
            rel="noopener"
          >
            Give Us Feedback
          </Link>
          <Link
            className={classes.footerLink}
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/beacon_dates/"
          >
            Our Instagram
          </Link>
        </Box>
        <Box minWidth="200px"></Box>
      </Box>
      {/* </Container> */}
    </footer>
  );
};

export default withStyles(styles)(Footer);
