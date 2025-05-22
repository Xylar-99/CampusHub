const prisma = require('../db/db')
const dataUser = require('../utils/fetchUser')

const path = require('path')
const util = require('util');
const pump = util.promisify(require('stream').pipeline);
const fs = require('fs')


const sendMail = require('../utils/mailer')

const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'hii',
  text: '545',
};


async function postSignLocalHandler(req , res)
{
  const body_data = req.body;

  
  body_data.auth_provider = 'local';
  body_data.ver_code      = 545;
  console.log(body_data)
  data = { data:body_data }
  const respond = {};
  try
  {
    await prisma.user.create(data);
    mailOptions.to = body_data.email
    sendMail(mailOptions)
    respond.check = 'yes';
  }
  catch(error)
  {
    console.log("ready exist")
    respond.check = 'no';
  }
  return res.send(respond);
}


async function postSignGoogleHandler(req , res)
{
  const respond = {};
  const body_data = {}
  body_data['name'] = req.body.name;
  body_data['email'] = req.body.email;
  body_data['password'] = '';
  body_data['auth_provider']   = 'google';

  data = { data:body_data }


  const response = await fetch('http://auth:4002/token/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(body_data.email),
  });
  
  const token = await response.json();

  try
  {
    await prisma.user.create(data);
    respond.check = 'yes';
    
  }
  catch(error)
  {
    respond.check = 'no';
  }
  
  console.log(token);
  return res.send(token);
}

async function postVerifyHandler(req , res) 
{
  const {email , code} = req.body;
  const user = await prisma.user.findUnique({where : {email : email} });

  console.log(user);

  console.log(typeof user.ver_code , typeof code , user.ver_code != code)
  if(user.ver_code != code)
    return res.send({verify : 'no'})
  
  
  return res.send({verify : 'yes'})
}

async function postLoginHandler(req , res)
{

  try 
  {

  const {email} = req.body;
  const user = await prisma.user.findUnique({where : {email : email} });

  if(!user || user.password != req.body.password)
    return res.send({error:"incorect password!!"})

  const response = await fetch('http://auth:4002/token/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(email),
  });
  
  const token = await response.json();
  
  return res.send(token);
  } 
  catch (error) 
  {
    console.log(error)
  }
  
  return res.send("not valid");
}




async function postDetailsHandler(req , res)
{

    const user1 = await dataUser.getUserByRequest(req);

    const data_of_user = {};
    const parts = req.parts();

    for await (const part of parts) 
    {
      if (part.type === 'file')
        {
        const uploadPath = path.join('/var/www/html/frontend/images', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath)); 
        data_of_user.img = "../images/" + part.filename;
        }
      else
            data_of_user[part.fieldname] = part.value;
    
    }
    data_of_user.user_id = user1.id;
    data_of_user.username = user1.username;

    await prisma.profile.create({data:data_of_user});
    return res.redirect('/')
}

module.exports = {postLoginHandler, postVerifyHandler ,  postSignLocalHandler, postDetailsHandler, postSignGoogleHandler}