import React, { useState } from 'react';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';
import moment from 'moment';
import { AiOutlineTwitter, AiOutlineInstagram, AiFillEdit } from 'react-icons/ai';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import styles from './EditProfile.module.css';
import Button from '../../Button/Button';

const EditProfile = ({ userObj, isOpen, onCancel, onSave }) => {
  const [formData, setFormData] = useState(userObj);
  const updateForm = key => e => {
    const newFormData = { ...formData };
    newFormData[key] = e.target.value;
    setFormData(newFormData);
  };

  return (
    <Dialog open={isOpen} maxWidth="md">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form className={styles.form}>
          <TextField
            onChange={updateForm('bio')}
            value={formData.bio}
            variant="filled"
            fullWidth
            multiline
            label="Your bio"
          />
          <br />
          <br />
          <TextField
            value={formData.dob}
            label="Your date of birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={updateForm('dob')}
          />
          <br />
          <br />
          <TextField
            value={formData.relationshipStatus}
            variant="filled"
            fullWidth
            type="textarea"
            label="Your relationship status"
            onChange={updateForm('relationshipStatus')}
          />
          <br />
          <br />
          <TextField
            value={formData.favoriteNeighborhoods}
            variant="filled"
            fullWidth
            multiline
            label="Your favorite DC neighborhoods"
            onChange={updateForm('favoriteNeighborhoods')}
          />
          <br />
          <br />
          <TextField
            value={formData.dateSpecialties}
            variant="filled"
            fullWidth
            multiline
            label="Your date specialties"
            onChange={updateForm('dateSpecialties')}
          />
          <br />
          <br />
          <TextField
            value={formData.secretTalent}
            variant="filled"
            fullWidth
            multiline
            label="Your secret talents"
            onChange={updateForm('secretTalent')}
          />
          <br />
          <br />
          <TextField
            value={formData.firstDate}
            variant="filled"
            fullWidth
            multiline
            label="Your first ever date experience"
            onChange={updateForm('firstDate')}
          />
          <br />
          <br />
          <TextField
            value={formData.instagram}
            onChange={updateForm('instagram')}
            variant="filled"
            label="Your Instagram handle"
          />
          <br />
          <br />
          <TextField
            value={formData.twitter}
            onChange={updateForm('twitter')}
            variant="filled"
            label="Your Twitter handle"
          />
          <br />
          <br />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant={Button.VARIANTS.OUTLINED} onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
