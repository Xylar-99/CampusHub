const app = require('fastify')();



function StartServer()
{
    app.listen({port : 3000} , () => {console.log('server listen on abquaoub.42.fr:3000 ...')})
}


module.exports = {app , StartServer}