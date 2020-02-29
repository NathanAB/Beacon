import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from '@material-ui/core';

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
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsEditingDate({
            sections: [{}, {}],
          });
        }}
      >
        Create New Date
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                <b>Title</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">
                <b>Spot 1</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">
                <b>Spot 2</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">
                <b>Spot 3</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dateObjs.map(dateObj => {
            return (
              <TableRow hover key={dateObj.id} onClick={() => setIsEditingDate(dateObj)}>
                <TableCell>
                  <Typography variant="h6">{dateObj.name}</Typography>
                </TableCell>
                <TableCell>
                  <b>{dateObj?.sections[0]?.spot?.name}</b>
                  <br />
                  <i>{dateObj?.sections[0]?.spot?.neighborhood?.name}</i>
                </TableCell>
                <TableCell>
                  <b>{dateObj?.sections[1]?.spot?.name}</b>
                  <br />
                  <i>{dateObj?.sections[1]?.spot?.neighborhood?.name}</i>
                </TableCell>
                <TableCell>
                  <b>{dateObj?.sections[2]?.spot?.name}</b>
                  <br />
                  <i>{dateObj?.sections[2]?.spot?.neighborhood?.name}</i>
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
