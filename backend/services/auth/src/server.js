const app = require('fastify')();

async function StartServer()
{
    app.listen({port : 4002, host: '0.0.0.0'} , () => {console.log('server listen on abquaoub.42.fr:3000 ...')})
}

module.exports = {app , StartServer}