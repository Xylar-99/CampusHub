const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')
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
        url     : '/profile'  ,
        handler : getHandlers.getProfileHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/login.html' ,
        handler : getHandlers.getLoginFileHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/user'  ,
        handler : getHandlers.getUserHandler,
    } ,
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
    }

]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();