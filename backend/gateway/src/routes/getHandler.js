
const app = require('../services/server').app
const config_token = require('../controllers/settings')


async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}



async function getverificationpHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/verification.html')
}


async function getSignupHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/signup.html')
}

async function getLoginHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/login.html')
}


async function getUserHandler(req , res) 
{
    const respond = await fetch('http://user:4001/user');
    return res.send(respond);
}



async function getCallbackhandler(req , res) 
{
  const tokengoogle = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

  const result = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokengoogle.token.access_token}`
    }
  });

  const user = await result.json();

  const response = await fetch('http://user:4001/signup/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body:  JSON.stringify(user),
    });
  
  const token = await response.json();

  console.log(token)
  return res.setCookie('token', token.token, config_token).send(token);
}



module.exports = {getRootHandler , getLoginHandler , getverificationpHandler  ,getSignupHandler  , getCallbackhandler, getUserHandler }