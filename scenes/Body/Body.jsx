import React from 'react';

import CONSTANTS from '../../constants';
import AddDateForm from '../AddDateForm/AddDateForm';
import LoginDialog from '../LoginDialog/LoginDialog';
import Discover from '../Discover/Discover';
import MyDates from '../MyDates/MyDates';
import Admin from '../Admin/Admin';
import Store from '../../store';

import './Body.css';

const { TABS } = CONSTANTS;

function Body() {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');
  const editDate = store.get('editDate');
  const checkoutDate = store.get('checkoutDate');
  let contentToRender;

  function renderDiscover() {
    return <Discover />;
  }

  function renderMyDates() {
    return <MyDates />;
  }

  function renderAdmin() {
    return <Admin />;
  }

  switch (currentTab) {
    case TABS.DISCOVER:
      contentToRender = renderDiscover();
      break;
    case TABS.MY_DATES:
      contentToRender = renderMyDates();
      break;
    case TABS.ADMIN:
      contentToRender = renderAdmin();
      break;
    default:
      break;
  }
  return (
    <main>
      {(editDate || checkoutDate) && <AddDateForm />}
      <LoginDialog />
      {contentToRender}
    </main>
  );
}

export default Body;
