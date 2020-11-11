import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Input,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Link,
  Tab,
  Tabs,
} from '@material-ui/core';
import { set } from 'lodash';

import Button from '../../../../components/Button/Button';
import DateCard from '../../../../components/DateCard/DateCard';
import DateDetails from '../../../DateDetails/DateDetails';
import Store from '../../../../store';
import { createDatePlan, deleteDatePlan, updateDatePlan } from '../../../../api';
import Spinner from '../../../../components/Spinner/Spinner';
import { loadDates } from '../../../../utils';

const mdParser = new MarkdownIt();

const styles = theme => ({
  control: {
    margin: '10px 0px',
  },
  controlSmall: {
    minWidth: '150px',
    margin: '10px 0px',
    marginRight: '30px',
  },
  sectionHeader: {
    paddingTop: '30px',
  },
  section: {
    margin: '60px 0',
  },
  dialogTitle: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  dialogContent: {
    padding: '8px 34px',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {children}
    </div>
  );
}

function EditDateForm({ classes }) {
  const store = Store.useStore();
  const currentDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const neighborhoods = store.get('allNeighborhoods');
  const activities = store.get('activities');
  const tags = store.get('tags');
  const isNew = !currentDate.id;

  const [formData, setFormData] = useState({});
  const [activeTab, setTab] = useState(0);
  const handleTipsChange = (newText, sectionNum) => {
    formData.sections[sectionNum].tips = newText;
    setFormData(Object.assign({}, formData));
  };
  const [isSavingDate, setSavingDate] = useState(false);

  const onTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const addSection3 = () => {
    formData.sections[2] = {
      sectionNumber: 3,
    };
    setFormData(Object.assign({}, formData));
  };

  const updateFormData = (e, field) => {
    const newValue = e.target.value;
    set(formData, field, newValue);
    setFormData(Object.assign({}, formData));
  };

  // Convert tags names into tab object array
  const updateTags = (e, sectionNum) => {
    const newTags = e.target.value.map(tagId => tags.find(tag => tag.tagId === tagId));
    formData.sections[sectionNum].tags = newTags;
    setFormData(Object.assign({}, formData));
  };

  const deleteDate = async () => {
    const proceed = window.confirm('Are you sure you want to delete the date?');
    if (!proceed) {
      return;
    }
    setSavingDate(true);
    try {
      await deleteDatePlan(formData);
      await loadDates(store);
      setIsEditingDate(false);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSavingDate(false);
    }
  };

  const saveDate = async () => {
    if (
      formData.sections.some(sectionA =>
        formData.sections.some(
          sectionB =>
            (sectionA.sectionNumber === sectionB.sectionNumber && sectionA.id !== sectionB.id) ||
            sectionB.sectionNumber === 0,
        ),
      )
    ) {
      alert('Each section should have a unique section number set');
      return;
    }

    setSavingDate(true);
    try {
      await (isNew ? createDatePlan(formData) : updateDatePlan(formData));
      await loadDates(store);
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
          <hr />
          <section className={classes.section}>
            <FormControl className={classes.controlSmall}>
              <InputLabel>Section Number</InputLabel>
              <Select
                value={section?.sectionNumber || 0}
                onChange={e => updateFormData(e, `sections[${sectionNum}].sectionNumber`)}
                input={<Input />}
              >
                <MenuItem key={0} value={0}>
                  Unset
                </MenuItem>
                <MenuItem key={1} value={1}>
                  1
                </MenuItem>
                <MenuItem key={2} value={2}>
                  2
                </MenuItem>
                <MenuItem key={3} value={3}>
                  3
                </MenuItem>
              </Select>
            </FormControl>

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
              label="Section Description"
              multiline
              rows="4"
              value={section?.description || ''}
              onChange={e => updateFormData(e, `sections[${sectionNum}].description`)}
              variant="outlined"
              fullWidth
            />
            <FormControl className={classes.controlSmall}>
              <InputLabel>Neighborhood</InputLabel>
              <Select
                value={section?.spot?.neighborhoodId}
                onChange={e => updateFormData(e, `sections[${sectionNum}].spot.neighborhoodId`)}
                input={<Input />}
              >
                <MenuItem value={null}>
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
                  Under $30
                </MenuItem>
                <MenuItem key={2} value={2}>
                  $30 to $60
                </MenuItem>
                <MenuItem key={3} value={3}>
                  $60+
                </MenuItem>
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
            <TextField
              className={classes.control}
              value={section?.image || ''}
              onChange={e => updateFormData(e, `sections[${sectionNum}].image`)}
              label="Section Instagram Image ID - OR - full image URL"
              variant="outlined"
              fullWidth
            />

            <TextField
              className={classes.control}
              value={section?.imageAuthor || ''}
              onChange={e => updateFormData(e, `sections[${sectionNum}].imageAuthor`)}
              label="Section Instagram Image Author (if applicable - do NOT include '@')"
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
            <Box marginBottom="15px">
              <Link
                href="https://developers.google.com/places/place-id#find-id"
                target="_blank"
                rel="noopener"
              >
                Place ID lookup here
              </Link>
            </Box>
            <h6>Section Tips</h6>
            <MdEditor
              value={section?.tips}
              style={{ height: '500px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={({ text }) => handleTipsChange(text, sectionNum)}
            />
          </section>
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
        <Tabs value={activeTab} onChange={onTabChange}>
          <Tab label="Edit" />
          <Tab label="Preview" />
        </Tabs>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TabPanel value={activeTab} index={1}>
          <Box width="100%" maxWidth="1000px" margin="auto">
            <br />
            <DateCard dateObj={formData} />
            <br />
            <hr />
            <br />
            <DateCard dateObj={formData} variant={DateCard.VARIANTS.FULL} />
            <br />
            <hr />
            <br />
            <DateDetails dateObj={formData} />
            <br />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={0}>
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
          {formData.id && (
            <Typography variant="subtitle1">
              <strong>
                <Link target="_blank" href={`https://www.beacondates.com/date/${formData.id}`}>
                  Production Link to Date
                </Link>
              </strong>
            </Typography>
          )}
          {formData.id && (
            <Typography variant="subtitle1">
              <strong>
                <Link
                  target="_blank"
                  href={`https://app-staging.beacondates.com/date/${formData.id}`}
                >
                  Staging Link to Date
                </Link>
              </strong>
            </Typography>
          )}

          {renderSection(formData?.sections?.[0], 0)}
          {renderSection(formData?.sections?.[1], 1)}
          {formData?.sections?.[2] ? (
            renderSection(formData?.sections?.[2], 2)
          ) : (
            <Button onClick={addSection3}>Add Section 3</Button>
          )}
        </TabPanel>
      </DialogContent>
      <Box
        display="flex"
        flexDirection="row-reverse"
        padding="6px 12px"
        borderTop="1px solid lightGray"
      >
        <DialogActions>
          <Button onClick={saveDate}>{isNew ? 'Create Date' : 'Save Date'}</Button>
        </DialogActions>
        <DialogActions>
          <a onClick={() => setIsEditingDate(false)}>Cancel</a>
        </DialogActions>
        {!isNew && (
          <DialogActions>
            <Button onClick={deleteDate}>DELETE DATE</Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}

export default withStyles(styles)(EditDateForm);
