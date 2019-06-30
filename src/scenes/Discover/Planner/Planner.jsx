import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

import Store from '../../../store';
import Constants from '../../../constants';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  noDate: {
    padding: '10px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  textInput: {
    width: '100%',
  },
  confirmButton: {
    marginBottom: '1rem',
    marginRight: '1rem',
  },
});

function Planner({ classes }) {
  const store = Store.useStore();
  const checkoutDate = store.get('checkoutDate');
  const confirmCheckout = () => {
    const myDates = store.get('myDates');
    store.set('myDates')(myDates.concat([checkoutDate]));
    store.set('currentTab')(Constants.TABS.MY_DATES);
    store.set('checkoutDate')(false);
  };

  const cancelCheckout = () => store.set('checkoutDate')(false);

  if (!checkoutDate) {
    return '';
  }

  return (
    <Dialog open={!!checkoutDate.name} onClose={cancelCheckout} aria-labelledby="form-dialog-title">
      <IconButton aria-label="Close" className={classes.closeButton} onClick={cancelCheckout}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title">{`Planning: ${checkoutDate.name}`}</DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="date-name"
            label="Date Name"
            margin="normal"
            className={classes.textInput}
          />
          <TextField id="date-date" label="Date" margin="normal" className={classes.textInput} />
          <TextField id="date-time" label="Time" margin="normal" className={classes.textInput} />
          <TextField
            id="date-participant"
            label="Who's going?"
            margin="normal"
            className={classes.textInput}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={confirmCheckout}
          variant="contained"
          color="primary"
          size="small"
          className={classes.confirmButton}
        >
          Add this Date
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Planner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Planner);
