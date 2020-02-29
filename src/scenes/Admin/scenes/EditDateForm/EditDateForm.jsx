import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
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
  Link,
} from '@material-ui/core';
import { set } from 'lodash';

import Store from '../../../../store';
import { createDatePlan, updateDatePlan, getDates } from '../../../../api';
import Spinner from '../../../../components/Spinner/Spinner';

const styles = theme => ({
  control: {
    margin: '10px 0px',
  },
  controlSmall: {
    margin: '10px 0px',
    marginRight: '30px',
  },
  sectionHeader: {
    paddingTop: '30px',
  },
  dialogTitle: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  dialogContent: {
    padding: '8px 34px',
  },
});

function EditDateForm({ classes }) {
  const store = Store.useStore();
  const setDates = store.set('dates');
  const currentDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const neighborhoods = store.get('neighborhoods');
  const activities = store.get('activities');
  const tags = store.get('tags');
  const isNew = !currentDate.id;

  const [formData, setFormData] = useState({});
  const [isSavingDate, setSavingDate] = useState(false);

  const addSection3 = () => {
    formData.sections[2] = {};
    setFormData(Object.assign({}, formData));
  };

  const updateFormData = (e, field) => {
    const newValue = e.target.value;
    set(formData, field, newValue);
    setFormData(Object.assign({}, formData));
  };

  const updateTags = (e, sectionNum) => {
    const newTags = e.target.value.map(tagId => tags.find(tag => tag.tagId === tagId));
    formData.sections[sectionNum].tags = newTags;
    setFormData(Object.assign({}, formData));
  };

  const saveDate = async () => {
    setSavingDate(true);
    try {
      await (isNew ? createDatePlan(formData) : updateDatePlan(formData));
      const dates = await getDates();
      if (dates) {
        setDates(dates);
      }
      setIsEditingDate(false);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSavingDate(false);
    }
  };

  useEffect(() => {
    if (currentDate) {
      setFormData(JSON.parse(JSON.stringify(currentDate)));
    }
  }, [currentDate]);

  const renderSection = (section, sectionNum) => {
    return (
      section && (
        <>
          <Typography variant="h6" className={classes.sectionHeader}>
            <b>Section {sectionNum + 1}</b>
          </Typography>
          <FormControl className={classes.controlSmall}>
            <InputLabel>Length</InputLabel>
            <Select
              value={section?.minutes}
              onChange={e => updateFormData(e, `sections[${sectionNum}].minutes`)}
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
              <MenuItem key={120} value={120}>
                2 hours
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.controlSmall}>
            <InputLabel>Cost</InputLabel>
            <Select
              value={section?.cost}
              onChange={e => updateFormData(e, `sections[${sectionNum}].cost`)}
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
            value={section?.description || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].description`)}
            variant="outlined"
            fullWidth
          />
          <TextField
            className={classes.control}
            label="Section Tips"
            multiline
            rows="4"
            value={section?.tips || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].tips`)}
            variant="outlined"
            fullWidth
          />

          <TextField
            className={classes.control}
            value={section?.image || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].image`)}
            label="Section Instagram Image ID"
            variant="outlined"
            fullWidth
          />

          <TextField
            className={classes.control}
            value={section?.imageAuthor || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].imageAuthor`)}
            label="Section Instagram Image Author (do not include '@')"
            variant="outlined"
            fullWidth
          />
          <FormControl className={classes.controlSmall}>
            <InputLabel>Activity</InputLabel>
            <Select
              value={section?.activityId}
              onChange={e => updateFormData(e, `sections[${sectionNum}].activityId`)}
              input={<Input />}
            >
              <MenuItem value={-1}>
                <em>None</em>
              </MenuItem>
              {activities.map(a => (
                <MenuItem key={a.activityId} value={a.activityId}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.controlSmall}>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={section?.tags?.map(tag => tag.tagId) || []}
              onChange={e => {
                updateTags(e, sectionNum);
              }}
              input={<Input />}
            >
              {tags.map(tag => (
                <MenuItem key={tag.tagId} value={tag.tagId}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Spot */}
          {/* spotId: 4
createdAt: null
updatedAt: null
name: "Union Market"
placeId: "ChIJx7jHlBC4t4kR2AHuwQcWDqc"
location: null
neighborhoodId: 5 */}
          <Typography variant="subtitle1" className={classes.sectionHeader}>
            <b>Spot {sectionNum + 1}</b>
          </Typography>

          <TextField
            className={classes.control}
            label="Spot Name"
            value={section?.spot?.name || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].spot.name`)}
            variant="outlined"
            fullWidth
          />
          <TextField
            className={classes.control}
            label="Spot Google Place ID"
            value={section?.spot?.placeId || ''}
            onChange={e => updateFormData(e, `sections[${sectionNum}].spot.placeId`)}
            variant="outlined"
            fullWidth
          />
          <Link
            href="https://developers.google.com/places/place-id#find-id"
            target="_blank"
            rel="noopener"
          >
            Place ID lookup here
          </Link>
          <FormControl className={classes.controlSmall} fullWidth>
            <InputLabel>Neighborhood</InputLabel>
            <Select
              value={section?.spot?.neighborhoodId}
              onChange={e => updateFormData(e, `sections[${sectionNum}].spot.neighborhoodId`)}
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
        </>
      )
    );
  };

  return isSavingDate ? (
    <Spinner />
  ) : (
    <Dialog
      fullScreen
      open={!!currentDate}
      onClose={() => setIsEditingDate(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {isNew ? 'Create New Date' : 'Edit Date'}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6" className={classes.sectionHeader}>
          <b>Main Info</b>
        </Typography>
        <TextField
          className={classes.control}
          value={formData?.name}
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
          value={formData?.description}
          variant="outlined"
          fullWidth
          onChange={e => updateFormData(e, 'description')}
        />

        {renderSection(formData?.sections?.[0], 0)}
        {renderSection(formData?.sections?.[1], 1)}
        {formData?.sections?.[2] ? (
          renderSection(formData?.sections?.[2], 2)
        ) : (
          <Button variant="contained" color="primary" onClick={addSection3}>
            Add Section 3
          </Button>
        )}
      </DialogContent>
      <Box
        display="flex"
        flexDirection="row-reverse"
        padding="6px 12px"
        borderTop="1px solid lightGray"
      >
        <DialogActions>
          <Button variant="contained" onClick={saveDate} color="primary">
            {isNew ? 'Create Date' : 'Save Date'}
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={() => setIsEditingDate(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default withStyles(styles)(EditDateForm);
