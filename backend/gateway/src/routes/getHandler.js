
const app = require('../services/server').app
const config_token = require('../controllers/settings')
const fetchPOST = require('../utils/fetch')
const me = require('../utils/me')

async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}



async function getSignupHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/signup.html')
}

async function getLoginHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/login.html')
}




async function getverificationpHandler(req , res) 
{
    const whoami = await me(req);
    
    console.log(whoami.email);
    if(whoami.email != undefined)
    {
        console.log("ready is verifiedOn a second signup or login attempt, the system checks and sees it's already verified")
        return res.redirect('/login')
    }

    return res.type('text/html').sendFile('./pages/verification.html')
}



async function getMeHandler(req , res) 
{
    const whoami = await me(req);
    return res.send(whoami);
}


async function getCallbackhandler(req , res) 
{
    // get token of user from google
  const tokengoogle = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  const result = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${tokengoogle.token.access_token}` } });

  // info user google
  const user = await result.json();
  // create token jwt for user of google
  const token = await fetchPOST('http://user:4001/signup/google' , user);

  if(token.check == false)
    return res.redirect('/signup');

  return res.setCookie('token', token.token, config_token).send(token);
}


module.exports = {getRootHandler , getMeHandler , getLoginHandler , getverificationpHandler  ,getSignupHandler  , getCallbackhandler }