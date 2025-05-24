const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const handleDataChange = require('./utils/serverUtils')
const authSchemas = require('./controllers/authSchemas')

require('./controllers/pluginRegister')(); 

const app = server.app;


app.get('/chat' ,  { websocket: true } , getHandlers.getChatHandler);

const routes = [
    {
        method  : 'GET', 
        url     : '/'  ,
        handler : getHandlers.getRootHandler,
    } ,
    // {
    //     method  : 'GET', 
    //     url     : '/chat'  ,
    //     handler : getHandlers.getChatHandler,
    // } ,
    {
        method  : 'GET', 
        url     : '/verification'  ,
        handler : getHandlers.getverificationpHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/signup'  ,
        handler : getHandlers.getSignupHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/me'  ,
        handler : getHandlers.getMeHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/login'  ,
        handler : getHandlers.getLoginHandler,
    } ,
    {
        method : 'GET' , 
        url     : '/auth/google/callback' ,
        handler : getHandlers.getCallbackhandler,
    },
    {
        method  : 'POST' , 
        url     : '/signup' ,
        handler : postHandlers.postSignHandler,
        schema  : {schema: {body : authSchemas.signupSchema}},
    },
    {
        method  : 'POST' , 
        url     : '/login' ,
        handler : postHandlers.postLoginHandler,
        schema  : {schema: {body : authSchemas.loginSchema}},
    },
    {
        method  : 'POST' , 
        url     : '/verification' ,
        handler : postHandlers.postverificationHandler,
    },
]



routes.forEach(route => { app.route(handleDataChange(route)); })
server.StartServer();


