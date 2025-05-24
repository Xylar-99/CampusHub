const prisma = require('../db/db')
const dataUser = require('../utils/fetchUser')
const fetchPOST = require('../utils/fetch')

const path = require('path')
const util = require('util');
const pump = util.promisify(require('stream').pipeline);
const fs = require('fs')


const sendMail = require('../utils/mailer');

const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'hii',
  text: '455',
};


async function postSendMessageHandler(req , res) 
{
  const {message } = req.body;

  
}



















// handler local signup 
async function postSignLocalHandler(req , res)
{
  const body_data = req.body;
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  
  body_data.ver_code      = randomNumber;
  data = { data:body_data }
  
  try
  {
    // store data 
    await prisma.user.create(data);
    mailOptions.to = body_data.email;
    mailOptions.text = String(randomNumber);
  
    //  send code to email of user
    sendMail(mailOptions)
    return res.send({check:true});
  }
  catch(error)
  {
    // if fail prisma.user.create 
    console.log("ready exist")
  }

  return res.send({check:false});
}






// handler signup using api google
async function postSignGoogleHandler(req , res)
{
  const body_data = {}
  body_data['name'] = req.body.name;
  body_data['email'] = req.body.email;
  body_data['password'] = 'google';
  body_data['auth_provider']   = 'google';
  body_data['is_verified'] = true;
  data = { data:body_data }

  try
  {
    // store data and complete default password , ver_code is_verified ...
    await prisma.user.create(data);
    const token = fetchPOST('http://auth:4002/token/create' , body_data.email);
    return res.send(token);
  }
  catch(error)
  {
    console.log("Error not store data google api  database ;")
  }
  
  return res.send({check:false});
}




async function postVerifyHandler(req , res) 
{
  const {email , code} = req.body;
  const error = {verify : true};

  try {
    // get user  not verified  and not using google api  for only local signup 
    const user = await prisma.user.findUnique({where : { email : email , auth_provider : {not : 'google' } , is_verified : {not : true } }});

    if(user.ver_code != code)
      throw new Error('false');
  }
  catch (error) 
  {
    console.log(" *postverifyhandler* : Something went wrong" , error)
    error.verify = false;
  }

  return res.send(error)
}


async function postLoginHandler(req , res)
{
  const {email} = req.body;

  try 
  {
    const user = await prisma.user.findUnique({where : {email : email , auth_provider : {not : 'google'}} });

    if(!user || user.password != req.body.password)
      throw new Error('false');

    const token = await fetchPOST('http://auth:4002/token/create' , email);
    return res.send(token);
  } 
  catch (error) 
  {
    console.log(error)
  }

  return res.send({check : false});
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