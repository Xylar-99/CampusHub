
const fastify = require('../services/server')
const jwt = require('@fastify/jwt');
const cookie = require('@fastify/cookie')


const jwt_config = {
  secret: 'abquaoub' 
}


async function registerPlugins()
{
  fastify.app.register(jwt, jwt_config);
  fastify.app.register(cookie);
}

module.exports = registerPlugins;