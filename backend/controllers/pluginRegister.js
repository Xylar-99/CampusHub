
const fastify = require('../services/server')
const fastifyStatic = require('@fastify/static');
const formbody = require('@fastify/formbody')
const jwt = require('@fastify/jwt');
const path = require('path');
const cookie = require('@fastify/cookie')


const fastifyStatic_config = {
    root: path.join(__dirname , '../../frontend/'),
    prefix: '/',
}


const jwt_config = {
  secret: 'abquaoub' 
}


async function registerPlugins()
{
  fastify.app.register(formbody);
  fastify.app.register(fastifyStatic, fastifyStatic_config);
  fastify.app.register(jwt, jwt_config);
  fastify.app.register(cookie);
}

module.exports = registerPlugins;