const getHandlers = require('../controllers/get.controller');
const postHandlers = require('../controllers/post.controller');

const routes = [
  // GET routes
  { method: 'GET', url: '/', handler: getHandlers.getRootHandler },
  { method: 'GET', url: '/auth/google/callback', handler: getHandlers.getCallbackhandler },
  { method: 'GET', url: '/signup', handler: getHandlers.getSignupHandler },
  { method: 'GET', url: '/verification', handler: getHandlers.getverificationpHandler },
  { method: 'GET', url: '/login', handler: getHandlers.getLoginHandler },
  { method: 'GET', url: '/me', handler: getHandlers.getMeHandler },
  { method: 'GET', url: '/account', handler: getHandlers.getAccountHandler },

  // POST routes
  { method: 'POST', url: '/signup', handler: postHandlers.postSignHandler },
  { method: 'POST', url: '/login', handler: postHandlers.postLoginHandler },
  { method: 'POST', url: '/verification', handler: postHandlers.postverificationHandler },
  { method: 'POST', url: '/update', handler: postHandlers.postUpdateHandler },
];

async function authRoutes(fastify, options) {
  for (const route of routes) {
    fastify.route(route);
  }
}

module.exports = authRoutes;
