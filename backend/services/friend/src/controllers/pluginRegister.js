
const fastify = require('../services/server')
const formbody = require('@fastify/formbody')
const multipart  = require('@fastify/multipart');

async function registerPlugins()
{
  fastify.app.register(multipart , multipart_config);
  fastify.app.register(formbody);
}

module.exports = registerPlugins;