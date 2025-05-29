const config_token = require('../controllers/settings')
const authSchemas = require('../controllers/authSchemas')
const fs = require('fs')

const addFormats = require('ajv-formats');
const {pipeline} = require('stream/promises')

const helper = require('../utils/helper')


const Ajv = require('ajv');
const ajv = new Ajv();
addFormats(ajv)


// proccess signup local
async function postSignHandler(req , res)
{
  // check valid schema body 
  const validate = ajv.compile(authSchemas.signupSchema);
  if (!validate(req.body))
    return res.status(400).send({msg : false});
  
  req.session.email = req.body.email
  
  // send body to container user  for proccess data 
  const result = await helper.fetchPOST('http://user:4001/signup/local' , req.body);
  
  if(!result.check)
    return res.status(400).send({msg : false});

  return res.send({msg : true});

}



// function for for /verification    i send random number to email  for verifaction email
async function postverificationHandler(req , res) 
{
  const {code } = req.body;
  const email = req.session.get('email');

  const data = {}
  data.code = code;
  data.email = email;

  const result = await helper.fetchPOST('http://user:4001/verify' , data);

  if(!result.verify)
    return res.status(400).send({msg : false})

  return res.send({msg : true})
}


// proccess login
async function postLoginHandler(req , res)
{
  const validate = ajv.compile(authSchemas.loginSchema);
  if (!validate(req.body))
      return res.status(400).send({msg : false})

  
  const token = await helper.fetchPOST('http://user:4001/login' , req.body);
  
  if(token.check == false)
  {
    console.log("Error in login somthin wrong")
    return res.status(400).send({msg : false})
  }

  // here send token to client   and after access /profile or any route  client send token and i varify client using token 
  return res. setCookie('token', token.token, config_token).send({msg : true});
}



// proccess login
async function postUpdateHandler(req , res)
{
  const body = {};
  
  const whoami = await helper.me(req);
  body.user_id = whoami.user_id;
  
  const parts = req.parts();
  for await(const part of parts)
  {
    if(part.type === 'file')
    {
      const save = `/var/www/html/frontend/images/${part.filename}` ;
      await pipeline( part.file, fs.createWriteStream(save) );

      body['avatar_url'] = `../images/${part.filename}`;
    }
    else
      body[part.fieldname] = part.value;
      
  }

  const respond =  await helper.fetchPOST('http://user:4001/update' , body);

  return res.send({msg : "hello world"})
}



module.exports = {postSignHandler , postUpdateHandler  , postverificationHandler , postLoginHandler}