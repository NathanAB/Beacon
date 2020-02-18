import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Input,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';

import Store from '../../../../store';

const styles = theme => ({
  control: {
    margin: '10px 0px',
  },
  controlSmall: {
    margin: '10px 0px',
    marginRight: '30px',
  },
});

function EditDateForm({ classes }) {
  const store = Store.useStore();
  const currentDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const neighborhoods = store.get('neighborhoods');

  const renderSection = section => {
    return (
      <>
        <FormControl className={classes.controlSmall}>
          <InputLabel id="date-neighborhood-label">Neighborhood</InputLabel>
          <Select
            labelid="date-neighborhood-label"
            id="date-neighborhood"
            value={section.spot.neighborhoodId}
            // onChange={handleChange}
            input={<Input />}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {neighborhoods.map(n => (
              <MenuItem key={n.neighborhoodId} value={n.neighborhoodId}>
                {n.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.controlSmall}>
          <InputLabel id="date-length-label">Length</InputLabel>
          <Select
            labelid="date-length-label"
            id="date-length"
            value={section.minutes}
            // onChange={handleChange}
            input={<Input />}
          >
            <MenuItem key={30} value={30}>
              30 minutes
            </MenuItem>
            <MenuItem key={45} value={45}>
              45 minutes
            </MenuItem>
            <MenuItem key={60} value={60}>
              1 hour
            </MenuItem>
            <MenuItem key={90} value={90}>
              1.5 hours
            </MenuItem>
            <MenuItem key={90} value={120}>
              2 hours
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.controlSmall}>
          <InputLabel id="date-cost-label">Cost</InputLabel>
          <Select
            labelid="date-cost-label"
            id="date-cost"
            value={section.cost}
            // onChange={handleChange}
            input={<Input />}
          >
            <MenuItem key={0} value={0}>
              Free
            </MenuItem>
            <MenuItem key={1} value={1}>
              $
            </MenuItem>
            <MenuItem key={2} value={2}>
              $$
            </MenuItem>
            <MenuItem key={3} value={3}>
              $$$
            </MenuItem>
            <MenuItem key={4} value={4}>
              $$$$
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.control}
          id="date-section-description"
          label="Section Description"
          multiline
          rows="4"
          value={section.description}
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
          id="date-section-tips"
          label="Section Tips"
          multiline
          rows="4"
          value={section.tips}
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
          value={section.image}
          id="section-image"
          label="Section Instagram Image ID"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
          value={section.imageAuthor}
          id="section-image"
          label="Section Instagram Image Author (do not include '@')"
          variant="outlined"
          fullWidth
        />
      </>
    );
  };

  return (
    <Dialog
      fullWidth
      open={!!currentDate}
      onClose={() => setIsEditingDate(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Date</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.control}
          value={currentDate.name}
          id="date-title"
          label="Date Title"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
          id="date-description"
          label="Date Description"
          multiline
          rows="8"
          value={currentDate.description}
          variant="outlined"
          fullWidth
        />

        <Typography variant="h6">Section 1</Typography>
        {renderSection(currentDate.sections[0])}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditingDate(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(EditDateForm);
