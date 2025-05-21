const  app = require('../services/server').app;

async function postCreateToken(req , res) 
{
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${token.token.access_token}`,
    },
  });

    const profile = await userRes.json();
    console.log(profile);
    // console.log("abdo" , req.body)
    // const token = app.jwt.sign(req.body)
    return res.send({token : "token"});
}


module.exports = {postCreateToken}