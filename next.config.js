const withImages = require('next-images');

module.exports = withImages({
  env: {
    REACT_APP_MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_LOGROCKET_APP_ID: process.env.REACT_APP_LOGROCKET_APP_ID,
    REACT_APP_STRIPE_MONTHLY_PRICE_ID: process.env.REACT_APP_STRIPE_MONTHLY_PRICE_ID,
    REACT_APP_STRIPE_ANNUAL_PRICE_ID: process.env.REACT_APP_STRIPE_ANNUAL_PRICE_ID,
  },
});
