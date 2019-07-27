import { createConnectedStore } from 'undux';
import tags from './mocks/tags';
import neighborhoods from './mocks/neighborhoods';
import dates from './mocks/dates';
// import userDates from './mocks/userDates';
import constants from './constants';

// Create a store with an initial value.
export default createConnectedStore({
  tags,
  neighborhoods,
  dates,
  filters: [],
  isFilterPageOpen: false,
  currentTab: constants.TABS.DISCOVER,
  costs: ['Free', '$', '$$', '$$$', '$$$$'],
  durations: ['1 Hour', '2 Hours', '3 Hours', '4 Hours'],
  checkoutDate: false,
  editDate: false,
  userDates: [],
  focusedDate: false,
});
