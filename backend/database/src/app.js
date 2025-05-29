const server = require('./server')
const postHandlers = require('./routes/postHandler')

const helper = require('./utils/helper')
const app = server.app;


const routes = [
    {
        method  : 'POST' , 
        url     : '/store/:table' ,
        handler : postHandlers.postStoreHandler,
    },
    {
        method  : 'POST' , 
        url     : '/find/:table' ,
        handler : postHandlers.postFindHandler,
    },
    {
        method  : 'POST' , 
        url     : '/update/:table' ,
        handler : postHandlers.postUpdateHandler,
    },
]



routes.forEach(route => { app.route(helper.initRoutesFromConfig(route)); })
server.StartServer();


