import React from 'react';
import { PropTypes } from 'prop-types';

import CONSTANTS from '../../constants';
import Planner from '../Planner/Planner';
import Discover from '../Discover/Discover';

import './Body.css';

const { TABS } = CONSTANTS;

function Body({ currentTab, checkingOutDate, cancelCheckout, onAddDate }) {
  let contentToRender;

  function renderDiscover(onAddDate, checkingOutDate, cancelCheckout) {
    return (
      <>
        <Discover onAddDate={onAddDate} />
        <Planner checkingOutDate={checkingOutDate} cancelCheckout={cancelCheckout} />
      </>
    );
  }

  function renderMyDates() {}

  switch (currentTab) {
    case TABS.DISCOVER:
      contentToRender = renderDiscover(onAddDate, checkingOutDate, cancelCheckout);
      break;
    case TABS.MY_DATES:
      contentToRender = renderMyDates();
      break;
    default:
      break;
  }
  return <main>{contentToRender}</main>;
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
