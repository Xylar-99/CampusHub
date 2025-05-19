const app = require('fastify')();

async function StartServer()
{
    app.listen({port : 4000} , () => {console.log('server listen on abquaoub.42.fr:3000 ...')})
}

module.exports = {app , StartServer}