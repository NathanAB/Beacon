import React from 'react';

import CONSTANTS from '../../constants';
import AddDateForm from '../Discover/AddDateForm/AddDateForm';
import Discover from '../Discover/Discover';
import MyDates from '../MyDates/MyDates';
import Store from '../../store';

import './Body.css';

const { TABS } = CONSTANTS;

function Body() {
  const store = Store.useStore();
  const currentTab = store.get('currentTab');
  let contentToRender;

  function renderDiscover() {
    return (
      <>
        <Discover />
        <AddDateForm />
      </>
    );
  }

  function renderMyDates() {
    return <MyDates />;
  }

  switch (currentTab) {
    case TABS.DISCOVER:
      contentToRender = renderDiscover();
      break;
    case TABS.MY_DATES:
      contentToRender = renderMyDates();
      break;
    default:
      break;
  }
  return <main>{contentToRender}</main>;
}

export default Body;
