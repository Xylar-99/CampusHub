
const config_token = require('../controllers/settings')

// const sendMail = require('../utils/mailer')

// const mailOptions = {
//   from: 'abdoqoubai@gmail.com',
//   to: 'aquaoubai@gmail.com',
//   subject: 'Hello from Node.js',
//   text: 'This is a test email sent from Node.js using Nodemailer!',
// };


async function postSignHandler(req , res)
{

  if(Object.values(req.body).includes(''))
      return res.redirect('/');

  const response = await fetch('http://user:4001/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(req.body),
  });

  const result = await response.json();

  return res.send(result);
}



async function postLoginHandler(req , res)
{
  // if(Object.values(req.body).includes(''))
  //     return res.redirect('/');

  const tokenGoogle = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenGoogle.token.access_token}`,
    },
  });

  const profile = await userRes.json();

  const response = await fetch('http://user:4001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(profile),
  });

  const token = await response.json();

  return res.setCookie('token', token, config_token.token_config).send({token : token});
}



module.exports = {postSignHandler ,postLoginHandler}