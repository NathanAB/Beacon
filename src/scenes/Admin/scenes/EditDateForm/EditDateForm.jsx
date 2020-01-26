import React, { useState, useEffect } from 'react';
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
import { createDatePlan } from '../../../../api';

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

  const [formData, setFormData] = useState({});

  const updateFormData = (e, field) => {
    const newValue = e.currentTarget.value;
    formData[field] = newValue;
    setFormData(Object.assign({}, formData));
  };

  const saveDate = () => {
    createDatePlan(formData);
  };

  useEffect(() => {
    setFormData(currentDate);
  }, [currentDate]);

  const renderSection = section => {
    return (
      <>
        <Typography variant="h6">Section</Typography>
        <FormControl className={classes.controlSmall} fullWidth>
          <InputLabel>Neighborhood</InputLabel>
          <Select
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
        <FormControl className={classes.controlSmall} fullWidth>
          <InputLabel>Length</InputLabel>
          <Select
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
        <FormControl className={classes.controlSmall} fullWidth>
          <InputLabel>Cost</InputLabel>
          <Select
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
          label="Section Description"
          multiline
          rows="4"
          value={section.description}
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
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
          label="Section Instagram Image ID"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.control}
          value={section.imageAuthor}
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
          value={formData.name}
          id="date-title"
          label="Date Title"
          variant="outlined"
          fullWidth
          onChange={e => updateFormData(e, 'name')}
        />
        <TextField
          className={classes.control}
          id="date-description"
          label="Date Description"
          multiline
          rows="8"
          value={formData.description}
          variant="outlined"
          fullWidth
          onChange={e => updateFormData(e, 'description')}
        />

        {formData.sections &&
          formData.sections.length &&
          formData.sections.map(section => renderSection(section))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const newFormData = Object.assign({}, formData);
            if (formData.sections) {
              newFormData.sections.push({
                spot: {},
              });
            } else {
              newFormData.sections = [
                {
                  spot: {},
                },
              ];
            }
            setFormData(newFormData);
          }}
        >
          Add New Section
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditingDate(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
      <DialogActions>
        <Button variant="contained" onClick={saveDate} color="primary">
          Save Date
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(EditDateForm);
