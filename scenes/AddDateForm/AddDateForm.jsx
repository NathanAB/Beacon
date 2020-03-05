import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
  Typography,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import ReactGA from 'react-ga';

import Store from '../../store';
import Constants from '../../constants';
import * as api from '../../api';
import { useDesktop } from '../../utils';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  deleteButton: {
    fontWeight: 600,
  },
  textInput: {
    width: '100%',
  },
  formTitle: {
    padding: '16px 46px 16px 24px',
  },
});

// TODO - Add validation
function AddDateForm({ classes }) {
  const store = Store.useStore();
  const checkoutDate = store.get('checkoutDate');
  const editDate = store.get('editDate');
  const [name, setName] = useState(editDate ? editDate.name : '');
  const [dateTime, setDateTime] = useState(editDate ? moment(editDate.startTime) : moment());
  const [notes, setNotes] = useState(editDate ? editDate.notes : '');
  const [isSaving, setIsSaving] = useState(false);
  const isDesktop = useDesktop();
  let userDates = store.get('userDates');

  const confirmCheckout = async e => {
    e.preventDefault();

    // If the date already has an ID, that means it's an edit (not creation).
    const isEditing = Boolean(editDate.id);

    // Do not allow saving without a date name
    if (!name) {
      return;
    }

    setIsSaving(true);

    const newUserDate = {
      id: editDate.id,
      dateId: checkoutDate.id || editDate.dateId,
      name,
      startTime: dateTime.toISOString(),
      notes,
    };

    if (isEditing) {
      ReactGA.event({
        category: 'Interaction',
        action: 'Save User Date',
        label: editDate.id.toString(),
      });
      await api.updateUserDate(newUserDate);
    } else {
      ReactGA.event({
        category: 'Interaction',
        action: 'Create User Date',
        label: checkoutDate.name,
      });
      await api.createUserDate(newUserDate);
    }

    const refreshedDates = await api.getUserDates();

    if (editDate) {
      userDates = userDates.filter(date => date.id !== editDate.id);
    }

    store.set('userDates')(refreshedDates);
    store.set('currentTab')(Constants.TABS.MY_DATES);
    store.set('checkoutDate')(false);
    store.set('editDate')(false);
    ReactGA.pageview(Constants.TABS.MY_DATES);
    setIsSaving(false);
    window.scrollTo(0, 0);
  };

  const cancelCheckout = () => {
    console.log(editDate, checkoutDate);
    ReactGA.event({
      category: 'Interaction',
      action: editDate ? 'Cancel Edit User Date' : 'Cancel Checkout',
      label: editDate ? editDate.id.toString() : checkoutDate.name,
    });
    store.set('checkoutDate')(false);
    store.set('editDate')(false);
  };

  const deleteDate = async () => {
    const confirm = window.confirm('Are you sure you want to delete this date?');
    if (!confirm) {
      return;
    }
    console.log(editDate);
    ReactGA.event({
      category: 'Interaction',
      action: 'Delete User Date',
      label: editDate.id.toString(),
    });

    setIsSaving(true);
    await api.deleteUserDate(editDate);
    const refreshedDates = await api.getUserDates();
    store.set('userDates')(refreshedDates);
    store.set('checkoutDate')(false);
    store.set('editDate')(false);
    setIsSaving(false);
  };

  const renderButtons = () => {
    if (isSaving)
      return (
        <Box margin="24px 0" display="flex" flexDirection="row-reverse">
          <Typography variant="subtitle1">Saving date...</Typography>
        </Box>
      );

    return (
      <Box
        margin="24px 0"
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
      >
        <Button variant="contained" color="primary" type="submit">
          {editDate ? 'Save Changes' : 'Save My Details'}
        </Button>
        {editDate && (
          <Button
            onClick={deleteDate}
            color="primary"
            type="button"
            className={classes.deleteButton}
          >
            Delete Date
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Dialog
      fullScreen={!isDesktop}
      open={!!checkoutDate || !!editDate}
      onClose={cancelCheckout}
      aria-labelledby="form-dialog-title"
    >
      <IconButton aria-label="Close" className={classes.closeButton} onClick={cancelCheckout}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className={classes.formTitle}>
        {editDate ? 'Edit date' : `Planning: ${checkoutDate.name}`}
      </DialogTitle>
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

          <DateTimePicker
            margin="normal"
            className={classes.textInput}
            value={dateTime}
            onChange={setDateTime}
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

          {renderButtons()}
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddDateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDateForm);
