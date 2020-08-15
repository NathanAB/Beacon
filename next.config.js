const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages({
  env: {
    REACT_APP_MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
});
