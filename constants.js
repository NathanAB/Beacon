const API_URL = process.env.REACT_APP_API_URL || 'http://local.beacondates.com:8080';
const KEYS = {
  MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
};

export default {
  PAGES: {
    DISCOVER: '/',
    MY_DATES: '/my-dates',
    SEARCH: '/search',
    NEIGHBORHOOD: '/neighborhood',
    ADMIN: '/admin',
    DATE_DETAILS: '/date',
    USER_DETAILS: '/user',
  },
  API: {
    AUTH: `${API_URL}/api/auth`,
    ROOT: API_URL,
    LOGIN_GOOGLE: `${API_URL}/login/google`,
    LOGIN_FACEBOOK: `${API_URL}/login/facebook`,
    LOGOUT: `${API_URL}/logout`,
    DATES: `${API_URL}/api/dates`,
    LIKED_DATES: `${API_URL}/api/likedDates`,
    NEIGHBORHOODS: `${API_URL}/api/neighborhoods`,
    TAGS: `${API_URL}/api/tags`,
    ACTIVITIES: `${API_URL}/api/activities`,
    USER_DATES: `${API_URL}/api/userDates`,
    THUMBNAIL: `${API_URL}/api/thumbnail`,
    COMMENTS: `${API_URL}/api/comments`,
    USERS: `${API_URL}/api/users`,
    ADMIN: {
      DATE_PLAN: `${API_URL}/api/admin/datePlan`,
      USERS: `${API_URL}/api/admin/users`,
    },
  },
  KEYS,
  ADMINS: ['nathanb92@gmail.com', 'haris.a.shafiq@gmail.com', 'hannaholin@gmail.com'],
  LOGROCKET_APP_ID: process.env.REACT_APP_LOGROCKET_APP_ID || 'g4lvwu/beacon',
  FLAGS: {
    FRESH_LOGIN: 'freshLogin',
  },
  LOCAL_STORAGE: {
    PENDING_COMMENT: 'pendingComment',
  },
};
