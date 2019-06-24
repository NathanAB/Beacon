import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';

const styles = {};

function MyDates({}) {
  const store = Store.useStore();
  const myDates = store.get('myDates');

  function renderMyDates() {
    return myDates.map(date => {
      return date.name;
    });
  }

  return <>{renderMyDates()}</>;
}

export default withStyles(styles)(MyDates);
