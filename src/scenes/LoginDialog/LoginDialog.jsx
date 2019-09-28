import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Store from '../../store';
import Constants from '../../constants';
import googleIcon from '../../assets/img/googleIcon.png';

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    textAlign: 'center',
    minWidth: '250px',
  },
  dialogTitle: {
    padding: '16px 46px 16px 24px',
  },
  google: {
    height: '32px',
    marginRight: '8px',
  },
  loginLink: {
    textDecoration: 'none',
    marginBottom: '16px',
    display: 'block',
  },
  loginButton: {
    margin: '15px 0',
    padding: '10px 0',
  },
});

function LoginDialog({ classes }) {
  const store = Store.useStore();
  const isLoginDialogOpen = store.get('isLoginDialogOpen');

  const closeDialog = () => {
    store.set('isLoginDialogOpen')(false);
  };

  return (
    <Dialog open={isLoginDialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <IconButton aria-label="Close" className={classes.closeButton} onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        Sign in or sign up!
      </DialogTitle>
      <DialogContent className={classes.content}>
        <a href={Constants.API.LOGIN_GOOGLE} className={classes.loginLink}>
          <Button
            variant="contained"
            aria-label="Login with Google"
            color="secondary"
            size="medium"
            fullWidth
            className={classes.loginButton}
          >
            <img src={googleIcon} alt="Google Icon" className={classes.google} /> Login with Google
          </Button>
        </a>
        <a href={Constants.API.LOGIN_FACEBOOK} className={classes.loginLink}>
          <Button
            variant="contained"
            aria-label="Login with Facebook"
            color="secondary"
            size="medium"
            fullWidth
            className={classes.loginButton}
          >
            Login with Facebook
          </Button>
        </a>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginDialog);
