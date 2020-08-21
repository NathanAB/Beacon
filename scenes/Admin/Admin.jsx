import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Typography, FormGroup, FormControlLabel, Switch, Box } from '@material-ui/core';

import MaterialTable from 'material-table';

import Button from '../../components/Button/Button';
import Store from '../../store';

import Spinner from '../../components/Spinner/Spinner';
import { loadDates } from '../../utils';
import { updateDatePlan } from '../../api';
import Constants from '../../constants';

const EditDateForm = dynamic(() => import('./scenes/EditDateForm/EditDateForm'), { ssr: false });

function Admin() {
  const store = Store.useStore();
  const isEditingDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const dateObjs = store.get('adminDates');
  const [isSavingDate, setSavingDate] = useState(false);
  const user = store.get('user');

  if (!user) {
    return <a href={Constants.API.LOGIN_GOOGLE}>Login</a>;
  }

  const toggleActive = async dateObj => {
    // eslint-disable-next-line no-param-reassign
    dateObj.active = !dateObj.active;
    setSavingDate(true);
    try {
      await updateDatePlan(dateObj);
      await loadDates(store);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSavingDate(false);
    }
  };

  const toggleNew = async dateObj => {
    // eslint-disable-next-line no-param-reassign
    dateObj.new = !dateObj.new;
    setSavingDate(true);
    try {
      await updateDatePlan(dateObj);
      await loadDates(store);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSavingDate(false);
    }
  };

  return (
    <Box margin="20px">
      {isSavingDate && <Spinner />}
      {isEditingDate && <EditDateForm />}
      <Button
        onClick={() => {
          setIsEditingDate({
            sections: [{}, {}],
          });
        }}
      >
        Create New Date
      </Button>
      <MaterialTable
        style={{ marginTop: '20px' }}
        title="All Beacon Dates"
        columns={[
          {
            title: 'Title',
            field: 'name',
            render: dateObj => <Typography variant="h6">{dateObj.name}</Typography>,
          },
          {
            title: 'Neighborhood 1',
            field: 'sections[0].spot.neighborhood.name',
          },
          {
            title: 'Spot 1',
            field: 'sections[0].spot.name',
          },
          {
            title: 'Neighborhood 2',
            field: 'sections[1].spot.neighborhood.name',
          },
          {
            title: 'Spot 2',
            field: 'sections[1].spot.name',
          },
          {
            title: 'Neighborhood 3',
            field: 'sections[2].spot.neighborhood.name',
          },
          {
            title: 'Spot 3',
            field: 'sections[2].spot.name',
          },
          {
            title: 'State',
            field: 'active',
            type: 'boolean',
            render: dateObj => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dateObj.active}
                      color="primary"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onChange={() => {
                        toggleActive(dateObj);
                      }}
                    />
                  }
                  label={dateObj.active ? 'Active' : 'Hidden'}
                />
              </FormGroup>
            ),
          },
          {
            title: 'New Tag',
            field: 'new',
            type: 'boolean',
            render: dateObj => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dateObj.new}
                      color="primary"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onChange={() => {
                        toggleNew(dateObj);
                      }}
                    />
                  }
                  label={dateObj.new ? 'New' : 'Old'}
                />
              </FormGroup>
            ),
          },
        ]}
        data={dateObjs}
        options={{
          sorting: true,
        }}
        onRowClick={(event, dateObj) => setIsEditingDate(dateObj)}
      />
    </Box>
  );
}

export default Admin;
