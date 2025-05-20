
const fastify = require('../services/server')
const fastifyStatic = require('@fastify/static');
const formbody = require('@fastify/formbody')
const jwt = require('@fastify/jwt');
const path = require('path');
const cookie = require('@fastify/cookie')
const multipart  = require('@fastify/multipart');


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


async function registerPlugins()
{
  fastify.app.register(fastifyStatic, fastifyStatic_config);
  fastify.app.register(jwt, jwt_config);
  fastify.app.register(cookie);
  fastify.app.register(multipart , multipart_config);
  fastify.app.register(formbody);
}

module.exports = registerPlugins;