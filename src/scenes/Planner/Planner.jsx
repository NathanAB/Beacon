import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';

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
});

function Planner(props) {
  const { classes, checkingOutDate, cancelCheckout } = props;

  return (
    <Dialog
      open={!!checkingOutDate.name}
      onClose={cancelCheckout}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{checkingOutDate.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {checkingOutDate.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelCheckout} color="primary">
          Cancel
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
