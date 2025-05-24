const server = require('./services/server')
const getHandlers = require('./routes/getHandler')
const postHandlers = require('./routes/postHandler')
const routeUtils = require('./utils/serverUtils')

require('./controllers/pluginRegister')(); 


const app = server.app;


app.get('/new' , { websocket: true } , getHandlers.getUserHandler);

// const routes = [
//     {
//         method  : 'GET' , 
//         url     : '/new' ,
//         handler : getHandlers.getUserHandler,
//     },
//     {
//         method  : 'POST' , 
//         url     : '/signup/local' ,
//         handler : postHandlers.postSignLocalHandler,
//     },
//     {
//         method  : 'POST' , 
//         url     : '/signup/google' ,
//         handler : postHandlers.postSignGoogleHandler,
//     },
//     {
//         method  : 'POST' , 
//         url     : '/login' ,
//         handler : postHandlers.postLoginHandler,
//     },
//     {
//         method  : 'POST' , 
//         url     : '/verify' ,
//         handler : postHandlers.postVerifyHandler,
//     },
// ]



// routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
server.StartServer();


