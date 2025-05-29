const server = require('./server')
const postHandlers = require('./routes/postHandler')
const helper = require('./utils/helper')


require('./controllers/pluginRegister')(); 
const app = server.app;






const routes = [
    {
        method  : 'POST', 
        url     : '/token/create'  ,
        handler : postHandlers.postCreateToken,
    } ,
    {
        method  : 'POST', 
        url     : '/token/verify'  ,
        handler : postHandlers.postVerifyToken,
    } ,
]


routes.forEach(route => { app.route(helper.initRoutesFromConfig(route)); })
server.StartServer();


