import React from 'react';
import { Button, Typography, withStyles, TextField } from '@material-ui/core';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url =
  'https://beacondates.us4.list-manage.com/subscribe/post?u=004fa114757b8134c34c5f7d1&amp;id=a96536c7f6';

const styles = theme => ({
  subscribeInput: {
    backgroundColor: theme.palette.secondary.text,
    borderRadius: '5px',
    marginBottom: '10px',
  },
});

const SubscribeForm = ({ classes }) => {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => {
        let email;
        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                subscribe({
                  EMAIL: email.value,
                });
              }}
            >
              <TextField
                type="email"
                label="Subscribe to stay updated"
                variant="filled"
                placeholder="Your email address"
                color="secondary"
                fullWidth
                size="small"
                className={classes.subscribeInput}
                      inputRef={node => (email = node)} // eslint-disable-line
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="text.secondary"
                fullWidth
                size="large"
              >
                Subscribe
              </Button>
            </form>
            {status === 'sending' && (
              <Typography variant="subtitle1" style={{ color: 'white' }}>
                sending...
              </Typography>
            )}
            {status === 'error' && (
              <Typography
                variant="subtitle1"
                style={{ color: 'white' }}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            {status === 'success' && (
              <Typography variant="subtitle1" style={{ color: 'white' }}>
                Subscribed!
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
};

export default withStyles(styles)(SubscribeForm);
