const API_URL = process.env.REACT_APP_API_URL || '';
const KEYS = {
  MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
};

export default {
  TABS: {
    DISCOVER: '/discover',
    MY_DATES: '/my-dates',
    ADMIN: '/admin',
  },
  API: {
    AUTH: `${API_URL}/api/auth`,
    ROOT: API_URL,
    LOGIN_GOOGLE: `${API_URL}/login/google`,
    LOGIN_FACEBOOK: `${API_URL}/login/facebook`,
    LOGOUT: `${API_URL}/logout`,
    DATES: `${API_URL}/api/dates`,
    NEIGHBORHOODS: `${API_URL}/api/neighborhoods`,
    TAGS: `${API_URL}/api/tags`,
    USER_DATES: `${API_URL}/api/userDates`,
    ADMIN: {
      DATE_PLAN: `${API_URL}/api/admin/datePlan`,
    },
  },
  KEYS,
  // ADMINS: ['nathanb92@gmail.com'],
  ADMINS: [],
};
