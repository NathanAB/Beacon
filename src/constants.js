const API_URL = process.env.API_URL || '';

export default {
  TABS: {
    DISCOVER: 'discover',
    MY_DATES: 'my-dates',
  },
  API: {
    AUTH: `${API_URL}/api/auth`,
    ROOT: API_URL,
    LOGIN_GOOGLE: `${API_URL}/login/google`,
    LOGOUT: `${API_URL}/logout`,
    DATES: `${API_URL}/api/dates`,
  },
};
