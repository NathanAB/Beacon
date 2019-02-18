import React from 'react';
import { PropTypes } from 'prop-types';

import CONSTANTS from '../../constants';
import Planner from '../Planner/Planner';
import Discover from '../Discover/Discover';

import './Body.css';

const { TABS } = CONSTANTS;

function renderDiscover(onAddDate) {
  return (<Discover onAddDate={onAddDate} />);
}

function renderPlanner(currentDate) {
  return (
    <Planner currentDate={currentDate} />
  );
}

function renderMyDates() {

}

function Body({ currentTab, currentDate, onAddDate }) {
  let contentToRender;
  switch (currentTab) {
    case TABS.DISCOVER:
      contentToRender = renderDiscover(onAddDate);
      break;
    case TABS.PLANNER:
      contentToRender = renderPlanner(currentDate);
      break;
    case TABS.MY_DATES:
      contentToRender = renderMyDates();
      break;
    default:
      break;
  }
  return (
    <main>
      {contentToRender}
    </main>
  );
}

Body.propTypes = {
  currentTab: PropTypes.string,
  currentDate: PropTypes.array,
  onAddDate: PropTypes.func.isRequired,
};

Body.defaultProps = {
  currentTab: 'discover',
  currentDate: [],
};

export default Body;
