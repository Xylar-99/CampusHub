const app = require('../server').app
const config_token = require('../controllers/settings')
const helper = require('../utils/helper')


const amqp = require('amqplib');


async function  connect_rabbitmq() 
{
    try {
        
        const connection = await amqp.connect('amqp://rabbitmq:5672');
        const channel = await connection.createChannel();
        
        const queue = 'email';
        const message = 'Hello from abdelbassat!';
        
        await channel.assertQueue(queue);
        
        channel.sendToQueue(queue, Buffer.from(message));
        
    } 
    catch (error) 
    {
        console.log("Error");
    }
}



async function getRootHandler(req , res) 
{

    await connect_rabbitmq();
    return res.type('text/html').sendFile('index.html')
}

async function getSignupHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/signup.html')
}

async function getAccountHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/account.html')
}

async function getLoginHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/login.html')
}

async function getMeHandler(req , res) 
{
    const whoami = await helper.me(req);
    return res.send(whoami);
}

async function getverificationpHandler(req , res) 
{
    const whoami = await helper.me(req);
    
    console.log(whoami.email);
    if(whoami.email != undefined)
    {
        console.log("ready is verifiedOn a second signup or login attempt, the system checks and sees it's already verified")
        return res.redirect('/login')
    }

    return res.type('text/html').sendFile('./pages/verification.html')
}

async function getCallbackhandler(req , res) 
{
    // get token of user from google
    const tokengoogle = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const result = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${tokengoogle.token.access_token}` } });
    const user = await result.json();

    // create token jwt for user of google
    const token = await helper.fetchPOST('http://user:4001/signup/google' , user);

    // if(token.check == false)
    //   return res.redirect('/signup');

  return res.setCookie('token', token.token, config_token).redirect('/me');
}


module.exports = {getRootHandler , getMeHandler , getAccountHandler   , getLoginHandler , getverificationpHandler  ,getSignupHandler  , getCallbackhandler }