const server = require('./services/server')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

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


routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


