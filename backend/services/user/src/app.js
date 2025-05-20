const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

require('./controllers/pluginRegister')(); 


const app = server.app;

const routes = [
    {
        method  : 'GET', 
        url     : '/users'  ,
        handler : getHandlers.getUsersHandler,
    } ,
    {
        method  : 'GET'    , 
        url     : '/user'  ,
        handler : getHandlers.getUserHandler,
    } ,
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
        url     : '/user/details' ,
        handler : postHandlers.postDetailsHandler,
    },

]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


