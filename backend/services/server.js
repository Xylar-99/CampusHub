const app = require('fastify')();
const sequelize = require('../db/db')


async function StartServer()
{
    await sequelize.sync();
    app.listen({port : 4000} , () => {console.log('server listen on abquaoub.42.fr:3000 ...')})
}

module.exports = {app , StartServer}