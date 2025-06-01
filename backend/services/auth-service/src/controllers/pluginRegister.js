const fastify = require('../server')
const jwt = require('@fastify/jwt');


const jwt_config = {
  secret: 'abquaoub' 
}


async function registerPlugins()
{
  fastify.app.register(jwt, jwt_config);
}


module.exports = registerPlugins;