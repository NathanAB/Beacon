import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';

import Store from '../../store';
import EditDateForm from './scenes/EditDateForm/EditDateForm';

const styles = theme => ({});

function Admin({ classes }) {
  const store = Store.useStore();
  const isEditingDate = store.get('adminEditingDate');
  const setIsEditingDate = store.set('adminEditingDate');
  const dateObjs = store.get('dates');

  return (
    <>
      {isEditingDate && <EditDateForm />}
      <Button variant="contained" color="primary" onClick={() => setIsEditingDate({})}>
        Create New Date Plan
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Spot 1</TableCell>
            <TableCell>Spot 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dateObjs.map(dateObj => {
            return (
              <TableRow hover key={dateObj.id} onClick={() => setIsEditingDate(dateObj)}>
                <TableCell>{dateObj.name}</TableCell>
                <TableCell>{dateObj.description}</TableCell>
                <TableCell>
                  {dateObj.sections[0].spot.neighborhood.name}
                  <br />
                  {dateObj.sections[0].spot.name}
                </TableCell>
                <TableCell>
                  {dateObj.sections[1].spot.neighborhood.name}
                  <br />
                  {dateObj.sections[1].spot.name}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default withStyles(styles)(Admin);
