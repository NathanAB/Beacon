import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ReactGA from 'react-ga';

import Store from '../../store';
import Constants from '../../constants';
import googleIcon from '../../assets/img/googleIcon.png';
import facebookIcon from '../../assets/img/facebookIcon.png';

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
  loginIcon: {
    height: '32px',
    marginRight: '8px',
  },
  loginButton: {
    marginBottom: '16px',
    margin: '15px 0',
    padding: '10px 0',
  },
});

function LoginDialog({ classes }) {
  const store = Store.useStore();
  const isLoginDialogOpen = store.get('isLoginDialogOpen');

  const closeDialog = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Close Login Dialog',
    });
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
        <Button
          variant="contained"
          aria-label="Login with Google"
          size="medium"
          fullWidth
          className={classes.loginButton}
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Login with Google',
              label: 'Login Dialog',
            });
            window.location = Constants.API.LOGIN_GOOGLE;
          }}
        >
          <img src={googleIcon} alt="Google Icon" className={classes.loginIcon} />
          Login with Google
        </Button>
        <Button
          variant="contained"
          aria-label="Login with Facebook"
          size="medium"
          fullWidth
          className={classes.loginButton}
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Login with Facebook',
              label: 'Login Dialog',
            });
            window.location = Constants.API.FACEBOOK;
          }}
        >
          <img src={facebookIcon} alt="Facebook Icon" className={classes.loginIcon} />
          Login with Facebook
        </Button>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginDialog);
