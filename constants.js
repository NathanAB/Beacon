const API_URL = process.env.REACT_APP_API_URL || 'http://local.beacondates.com:8080';
const KEYS = {
  MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
};

export default {
  TABS: {
    DISCOVER: '/',
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
    ACTIVITIES: `${API_URL}/api/activities`,
    USER_DATES: `${API_URL}/api/userDates`,
    ADMIN: {
      DATE_PLAN: `${API_URL}/api/admin/datePlan`,
    },
  },
  KEYS,
  ADMINS: ['nathanb92@gmail.com', 'haris.a.shafiq@gmail.com', 'hannaholin@gmail.com'],
};
