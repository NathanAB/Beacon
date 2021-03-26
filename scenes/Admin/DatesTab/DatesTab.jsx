import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Typography, FormGroup, FormControlLabel, Switch } from '@material-ui/core';

import MaterialTable from 'material-table';

import Button from '../../../components/Button/Button';
import Store from '../../../store';

import Spinner from '../../../components/Spinner/Spinner';
import { loadDates } from '../../../utils';
import { adminUpdateDatePlan } from '../../../api';

const EditDateForm = dynamic(() => import('../../../components/EditDateForm/EditDateForm'), {
  ssr: false,
});

const DatesTab = () => {
  const store = Store.useStore();
  const isEditingDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const dateObjs = store.get('adminDates');
  const [isSavingDate, setSavingDate] = useState(false);
  const users = store.get('users');

  const toggleActive = async dateObj => {
    // eslint-disable-next-line no-param-reassign
    dateObj.active = !dateObj.active;
    setSavingDate(true);
    try {
      await adminUpdateDatePlan(dateObj);
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
      await adminUpdateDatePlan(dateObj);
      await loadDates(store);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setSavingDate(false);
    }
  };

  return (
    <>
      {isSavingDate && <Spinner />}
      {isEditingDate && <EditDateForm isAdmin />}
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
            title: 'Creator',
            field: 'creator',
            render: dateObj => <>{users.find(u => u.id === dateObj.creator)?.name}</>,
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
    </>
  );
};

export default DatesTab;
