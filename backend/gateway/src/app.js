const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const handleDataChange = require('./utils/serverUtils')
const authSchemas = require('./controllers/authSchemas')

require('./controllers/pluginRegister')(); 

const app = server.app;


const routes = [
    {
        method  : 'GET', 
        url     : '/'  ,
        handler : getHandlers.getRootHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/user'  ,
        handler : getHandlers.getUserHandler,
    } ,
    // {
    //     method : 'GET' , 
    //     url     : '/auth/google' ,
    //     handler : getHandlers.getAuthGooglehandler,
    // },
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
        method  : 'GET' , 
        url     : '/login/google' ,
        handler : postHandlers.postLoginHandler,
    },
]



routes.forEach(route => { app.route(handleDataChange(route)); })
server.StartServer();


