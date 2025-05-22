const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

require('./controllers/pluginRegister')(); 


const app = server.app;

const routes = [
    {
        method  : 'POST' , 
        url     : '/signup/local' ,
        handler : postHandlers.postSignLocalHandler,
    },
    {
        method  : 'POST' , 
        url     : '/signup/google' ,
        handler : postHandlers.postSignGoogleHandler,
    },
    {
        method  : 'POST' , 
        url     : '/login' ,
        handler : postHandlers.postLoginHandler,
    },
]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


