const fetchPOST = require('../utils/fetch')
const config_token = require('../controllers/settings')


async function postSignHandler(req , res)
{
  if(Object.values(req.body).includes(''))
    return res.redirect('/signup');

  req.session.email = req.body.email

  const result = await fetchPOST('http://user:4001/signup/local' , req.body);

  if(!result.check)
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

  const result = await fetchPOST('http://user:4001/verify' , data);

  if(result.verify == 'no')
    return res.redirect('/verification')

  return res.redirect('/login')
}



async function postLoginHandler(req , res)
{
  if(Object.values(req.body).includes(''))
    return res.redirect('/');

  const token = await fetchPOST('http://user:4001/login' , req.body);
  console.log(token.token);
  return res. setCookie('token', token.token, config_token).send(token);
}



module.exports = {postSignHandler, postverificationHandler ,postLoginHandler}