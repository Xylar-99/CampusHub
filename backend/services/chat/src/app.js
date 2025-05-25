const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

require('./controllers/pluginRegister')(); 


const app = server.app;


const routes = [
    {
        method  : 'GET' , 
        url     : '/new' ,
        handler : postHandlers.postNewClientHandler,
    },
    {
        method  : 'POST' , 
        url     : '/send' ,
        handler : postHandlers.postSendHandler,
    },
]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


