import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AddDateForm from '../AddDateForm/AddDateForm';
import LoginDialog from '../LoginDialog/LoginDialog';
import Discover from '../Discover/Discover';
import MyDates from '../MyDates/MyDates';
import Store from '../../store';

import './Body.css';
import DateSearch from '../DateSearch/DateSearch';
import FilterPage from '../FilterPage/FilterPage';

function Body() {
  const store = Store.useStore();
  const editDate = store.get('editDate');
  const checkoutDate = store.get('checkoutDate');

  return (
    <main>
      {(editDate || checkoutDate) && <AddDateForm />}
      <LoginDialog />
      <Switch>
        <Route path="/my-dates">
          <MyDates />
        </Route>
        <Route path="/discover">
          <Discover />
        </Route>
        <Route path="/dates">
          <DateSearch />
        </Route>
        <Route path="/filters">
          <FilterPage />
        </Route>
      </Switch>
    </main>
  );
}

export default Body;
