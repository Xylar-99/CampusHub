// const server = require('./services/server')
// const getHandlers = require('./routes/getHandler')
// const postHandlers = require('./routes/postHandler')
// const routeUtils = require('./utils/serverUtils')
// const authSchemas = require('./controllers/authSchemas')


// require('./controllers/pluginRegister')(); 


// const app = server.app;

// const routes = [

<<<<<<< HEAD
//     {
//         method  : 'GET', 
//         url     : '/'  ,
//         handler : getHandlers.getRootHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/user'  ,
//         handler : getHandlers.getUserHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/profile'  ,
//         handler : getHandlers.getProfileHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/setting'  ,
//         handler : getHandlers.getSettingHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/login'  ,
//         handler : getHandlers.getLoginHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/posts'  ,
//         handler : getHandlers.getPostsHandler,
//     } ,
//     {
//         method  : 'GET', 
//         url     : '/users'  ,
//         handler : getHandlers.getUsersHandler,
//     } ,
//     {
//         method  : 'POST' , 
//         url     : '/signup' ,
//         handler : postHandlers.postSignHandler,
//         schema  : {schema: {body : authSchemas.signupSchema}},
//     },
//     {
//         method  : 'POST' , 
//         url     : '/login' ,
//         handler : postHandlers.postLoginHandler,
//         schema  : {schema: {body : authSchemas.loginSchema}},
//     },
//     {
//         method  : 'POST' , 
//         url     : '/user/details' ,
//         handler : postHandlers.postDetailsHandler,
//         schema  : {schema: {body : authSchemas.detailsSchema}},
//     },
//     {
//         method  : 'POST' , 
//         url     : '/newPost' ,
//         handler : postHandlers.postnewPostHandler,
//     },
//     {
//         method  : 'POST' , 
//         url     : '/invite' ,
//         handler : postHandlers.postInviteHandler,
//     }
=======
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

>>>>>>> 022374aa79de603f157e7f870ec1dcde52d17b03

// ]



// routes.forEach(route => { app.route(routeUtils.handleDataChange(route)); })
// server.StartServer();



const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use smtp info
  auth: {
    user: 'abdoqoubai@gmail.com',
    pass: 'qfga utdh tpbw imtv', 
  },
});

// Define the email
const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'Hello from Node.js',
  text: 'This is a test email sent from Node.js using Nodemailer!',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});

