const server = require('./server')

const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')

const helper = require('./utils/helper')

require('./controllers/pluginRegister')(); 

const app = server.app;

const routes = [
    {
        method  : 'GET' , 
        url     : '/me' ,
        handler : getHandlers.getUserHandler,
    },
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
    {
        method  : 'POST' , 
        url     : '/verify' ,
        handler : postHandlers.postVerifyHandler,
    },
    {
        method  : 'POST' , 
        url     : '/update' ,
        handler : postHandlers.postUpdateHandler,
    },
]



routes.forEach(route => { app.route(helper.initRoutesFromConfig(route)); })
server.StartServer();


