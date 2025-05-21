
const fastify = require('../services/server')
const jwt = require('@fastify/jwt');
const cookie = require('@fastify/cookie')
const oauthPlugin = require('@fastify/oauth2');


const jwt_config = {
  secret: 'abquaoub' 
}

const config_auth =  {
  name: 'googleOAuth2',
  scope: ['profile', 'email'],
  credentials: {
    client: {
      id: '676952011207-ejdkepng7ovdfqmb109ingsgda5oncgb.apps.googleusercontent.com',
      secret: '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',
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/login/google',
  callbackUri: 'http://localhost:3000/login/google/callback',
  }


async function registerPlugins()
{
  fastify.app.register(jwt, jwt_config);
  fastify.app.register(cookie);
  fastify.app.register(oauthPlugin , config_auth);
}

module.exports = registerPlugins;