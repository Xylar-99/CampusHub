
const app = require('../services/server').app


async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}


// // get my user
async function getUserHandler(req , res) 
{
    const respond = await fetch('http://user:4001/user');
    return res.send(respond);
}



async function getAuthGooglehandler(req , res) 
{

  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=676952011207-ejdkepng7ovdfqmb109ingsgda5oncgb.apps.googleusercontent.com` +
    `&redirect_uri=http://abquaoub.42.fr:4000/auth/google/callback` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;
    
  res.redirect(redirectUrl);
}


async function getCallbackhandler(req , res) 
{

  const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

  const result = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${token.token.access_token}`
    }
  });


  const user = await result.json();


  res.send(user);
    
}



module.exports = {getRootHandler  , getCallbackhandler  , getAuthGooglehandler, getUserHandler }