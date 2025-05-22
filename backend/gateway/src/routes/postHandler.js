
const config_token = require('../controllers/settings')

async function postSignHandler(req , res)
{
  if(Object.values(req.body).includes(''))
    return res.redirect('/');

  req.session.email = req.body.email

  const response = await fetch('http://user:4001/signup/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(req.body),
  });

  const result = await response.json();
  if(result.check == 'no')
    return res.redirect('/signup')
  return res.redirect('/verification')
}

async function postverificationHandler(req , res) 
{
  const {code } = req.body;
  const email = req.session.get('email');

  const data = {}
  data.code = code;
  data.email = email;
  console.log(data);
  const response = await fetch('http://user:4001/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(data),
  });

  const result = await response.json();

  if(result.verify == 'no')
    return res.redirect('/verification')
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



module.exports = {postSignHandler, postverificationHandler ,postLoginHandler}