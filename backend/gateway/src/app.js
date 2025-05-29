const server = require('./server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const helper = require('./utils/helper')


require('./controllers/pluginRegister')(); 
const app = server.app;


const routes = [
    // get methods
    {
        method  : 'GET', 
        url     : '/'  ,
        handler : getHandlers.getRootHandler,
    } ,
    {
        method : 'GET' , 
        url     : '/auth/google/callback' ,
        handler : getHandlers.getCallbackhandler,
    },
    {
        method  : 'GET', 
        url     : '/signup'  ,
        handler : getHandlers.getSignupHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/verification'  ,
        handler : getHandlers.getverificationpHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/login'  ,
        handler : getHandlers.getLoginHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/me'  ,
        handler : getHandlers.getMeHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/account'  ,
        handler : getHandlers.getAccountHandler,
    } ,

    // post methods
    {
        method  : 'POST' , 
        url     : '/signup' ,
        handler : postHandlers.postSignHandler,
    },
    {
        method  : 'POST' , 
        url     : '/login' ,
        handler : postHandlers.postLoginHandler,
    },
    {
        method  : 'POST' , 
        url     : '/verification' ,
        handler : postHandlers.postverificationHandler,
    },
    {
        method  : 'POST' , 
        url     : '/update' ,
        handler : postHandlers.postUpdateHandler,
    },
]


routes.forEach(route => { app.route(helper.initRoutesFromConfig(route)); })
server.StartServer();


