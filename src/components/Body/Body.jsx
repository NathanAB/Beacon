import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import CONSTANTS from '../../constants';
import DateCard from '../DateCard/DateCard';
import DateCardContainer from '../DateCardContainer/DateCardContainer';
import Planner from '../Planner/Planner';
import DateObjs from '../../mocks/dates';

import './Body.css';

const { TABS } = CONSTANTS;

function renderDiscover(onAddDate) {
  const dateComponents = DateObjs.map(date => (<DateCard onClickAdd={onAddDate} dateObj={date} />));
  return (
    <React.Fragment>
      <div style={{ 'padding-top': '10px' }}>
        <Button color="primary" variant="outlined" style={{ width: '100%' }}>
          <Icon>filter_list</Icon>
          {' '}
          Filters
        </Button>
      </div>
      <DateCardContainer>
        { dateComponents }
      </DateCardContainer>
    </React.Fragment>
  );
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
