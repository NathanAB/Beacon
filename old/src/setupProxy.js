const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/login', { target: 'http://localhost:8080/' }));
  app.use(proxy('/logout', { target: 'http://localhost:8080/' }));
  app.use(proxy('/api', { target: 'http://localhost:8080/' }));
};
