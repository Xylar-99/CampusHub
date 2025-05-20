
const fastify = require('../services/server')
const formbody = require('@fastify/formbody')
const multipart  = require('@fastify/multipart');


const multipart_config = {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1 
  }
}


async function registerPlugins()
{
  fastify.app.register(multipart , multipart_config);
  fastify.app.register(formbody);
}

module.exports = registerPlugins;