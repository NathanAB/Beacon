import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
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
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textInput: {
    width: '100%',
  },
  confirmButton: {
    margin: '24px 0',
  },
  formTitle: {
    padding: '16px 46px 16px 24px',
  },
});

// TODO - Add validation
function AddDateForm({ classes }) {
  const store = Store.useStore();
  const checkoutDate = store.get('checkoutDate');
  const [name, setName] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const confirmCheckout = e => {
    e.preventDefault();
    if (!name) {
      return;
    }
    const userDates = store.get('userDates');
    const newUserDate = {
      dateId: checkoutDate.id,
      name,
      day,
      time,
      notes,
    };
    store.set('userDates')(userDates.concat([newUserDate]));
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
      <DialogTitle
        id="form-dialog-title"
        className={classes.formTitle}
      >{`Planning: ${checkoutDate.name}`}</DialogTitle>
      <DialogContent>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={confirmCheckout}
        >
          <TextField
            id="date-name"
            label="Date Name"
            margin="dense"
            className={classes.textInput}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <DatePicker
            margin="normal"
            className={classes.textInput}
            value={day}
            onChange={setDay}
            required
          />

          <TimePicker
            margin="normal"
            className={classes.textInput}
            value={time}
            onChange={setTime}
            required
          />

          <TextField
            id="date-notes"
            label="Notes"
            margin="dense"
            className={classes.textInput}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            className={classes.confirmButton}
          >
            Add this Date
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddDateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDateForm);
