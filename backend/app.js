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
        url     : '/settings'  ,
        handler : getHandlers.getSettingHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/messages'  ,
        handler : getHandlers.getMessagesHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/login'  ,
        handler : getHandlers.getLoginHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/posts'  ,
        handler : getHandlers.getPostsHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/myposts'  ,
        handler : getHandlers.getMyPostsHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/users'  ,
        handler : getHandlers.getUsersHandler,
    } ,
    {
        method  : 'GET', 
        url     : '/friends'  ,
        handler : getHandlers.getFriendsHandler,
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
    },
    {
        method  : 'POST' , 
        url     : '/user/details' ,
        handler : postHandlers.postDetailsHandler,
        schema  : {schema: {body : authSchemas.detailsSchema}},
    },
    {
        method  : 'POST' , 
        url     : '/newPost' ,
        handler : postHandlers.postnewPostHandler,
    },


]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();