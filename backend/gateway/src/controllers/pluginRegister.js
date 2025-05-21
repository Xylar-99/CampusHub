
const fastify = require('../services/server')
const fastifyStatic = require('@fastify/static');
const formbody = require('@fastify/formbody')
const jwt = require('@fastify/jwt');
const path = require('path');
const cookie = require('@fastify/cookie')
const multipart  = require('@fastify/multipart');
const auth2 = require('@fastify/oauth2');

const multipart_config = {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1 
  }
}
const fastifyStatic_config = {
    root: '/var/www/html/frontend',
    prefix: '/',
}


const jwt_config = {
  secret: 'abquaoub' 
}



const auth2_config = {
  name: 'googleOAuth2',
  scope: ['profile', 'email' , 'openid'],
  credentials: {
    client: {
      id: '676952011207-ejdkepng7ovdfqmb109ingsgda5oncgb.apps.googleusercontent.com',
      secret: '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'
    },
    auth: {
      authorizeHost: 'https://accounts.google.com',
      authorizePath: '/o/oauth2/v2/auth',
      tokenHost: 'https://oauth2.googleapis.com',
      tokenPath: '/token'
    }
  },
  startRedirectPath: '/auth/google',
  callbackUri: 'http://abquaoub.42.fr:4000/auth/google/callback'
}





async function registerPlugins()
{
  fastify.app.register(fastifyStatic, fastifyStatic_config);
  fastify.app.register(jwt, jwt_config);
  fastify.app.register(cookie);
  fastify.app.register(multipart , multipart_config);
  fastify.app.register(formbody);
  fastify.app.register(auth2 , auth2_config);

}

module.exports = registerPlugins;