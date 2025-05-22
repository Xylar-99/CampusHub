
const config_token = require('../controllers/settings')

async function postSignHandler(req , res)
{
  if(Object.values(req.body).includes(''))
      return res.redirect('/');

  const response = await fetch('http://user:4001/signup/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(req.body),
  });

  const result = await response.json();
  if(result.check == 'no')
    return res.redirect('/signup')
  return res.redirect('/login')
}



async function postLoginHandler(req , res)
{
  if(Object.values(req.body).includes(''))
    return res.redirect('/');

  const response = await fetch('http://user:4001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(req.body),
  });

  const token = await response.json();

  console.log(token.token);
  return res. setCookie('token', token.token, config_token).send(token);
}



module.exports = {postSignHandler ,postLoginHandler}