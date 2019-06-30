import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Store from '../../store';
import DatesList from '../Discover/DatesList/DatesList';
import DateCard from '../../components/DateCard/DateCard';

const styles = {};

function MyDates({}) {
  const store = Store.useStore();
  const myDates = store.get('myDates');

  function renderMyDates() {
    const dateCards = myDates.map(date => <DateCard dateObj={date} />);
    return <DatesList>{dateCards}</DatesList>;
  }

  return <>{renderMyDates()}</>;
}

export default withStyles(styles)(MyDates);
