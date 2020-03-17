import { createConnectedStore } from 'undux';
import mockTags from './mocks/tags';
import mockNeighborhoods from './mocks/neighborhoods';
import mockDates from './mocks/dates';
// import userDates from './mocks/userDates';

const USE_MOCKS = false;

// Create a store with an initial value.
export default createConnectedStore({
  tags: USE_MOCKS ? mockTags : [],
  activities: [],
  neighborhoods: USE_MOCKS ? mockNeighborhoods : [],
  dates: USE_MOCKS ? mockDates : [],
  adminDates: [],
  filters: [],
  isLoginDialogOpen: false,
  costs: ['Free', '$', '$$', '$$$'],
  durations: ['1 Hour', '2 Hours', '3 Hours'],
  checkoutDate: false,
  editDate: false,
  userDates: [],
  focusedDate: false,
  user: false,
  adminEditingDate: false,
  isDateFormOpen: false,
});