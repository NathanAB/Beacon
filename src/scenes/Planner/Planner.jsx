import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

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
});

function Planner(props) {
  const { classes, checkingOutDate, cancelCheckout } = props;

  return (
    <Dialog
      open={!!checkingOutDate.name}
      onClose={cancelCheckout}
      aria-labelledby="form-dialog-title"
    >
      <IconButton aria-label="Close" className={classes.closeButton} onClick={cancelCheckout}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title">
        {`Planning: ${checkingOutDate.name}`}
      </DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="date-name"
            label="Date Name"
            margin="normal"
            className={classes.textInput}
          />
          <TextField
            id="date-date"
            label="Date"
            margin="normal"
            className={classes.textInput}
          />
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
        <Button onClick={cancelCheckout} color="primary">
          I'm game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Planner.propTypes = {
  classes: PropTypes.object.isRequired,
  checkingOutDate: PropTypes.object,
  cancelCheckout: PropTypes.func.isRequired,
};

Planner.defaultProps = {
  checkingOutDate: {},
};

export default withStyles(styles)(Planner);
