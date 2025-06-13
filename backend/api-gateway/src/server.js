const app = require('fastify')();

async function StartServer()
{
    app.listen({port : 4000, host: '0.0.0.0'} , () => {console.log('server listen on http://localhost:4000 ...')})
}

module.exports = {app , StartServer}