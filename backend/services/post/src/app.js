const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

require('./controllers/pluginRegister')(); 


const app = server.app;

const routes = [
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
        method  : 'POST' , 
        url     : '/newPost' ,
        handler : postHandlers.postnewPostHandler,
    },
]



routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


