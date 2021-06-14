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
  allNeighborhoods: USE_MOCKS ? mockNeighborhoods : [],
  neighborhoods: USE_MOCKS ? mockNeighborhoods : [],
  dates: USE_MOCKS ? mockDates : [],
  adminDates: [],
  myDates: [],
  lastFilters: [],
  isLoginDialogOpen: false,
  costs: ['Free', 'Under $30', '$30 to $60', '$60+'],
  durations: ['1 Hour', '2 Hours', '3 Hours'],
  checkoutDate: false,
  editDate: false,
  userDates: [],
  users: [],
  user: false,
  adminEditingDate: false,
  isDateFormOpen: false,
  isFilterBarExpanded: false,
  isLoginDrawerOpen: false,
  hasAccess: false,
  hasMembership: false,
  likedDates: [],
});
