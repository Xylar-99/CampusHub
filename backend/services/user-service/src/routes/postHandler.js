const helper = require('../utils/helper')
const prisma = require('../db/db')
const amqp = require('amqplib');


const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'hii',
  text: '455',
};


async function  receve_rabbitmq()
{
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    const queue = 'email';
    await channel.assertQueue(queue);

    channel.consume(queue, (msg) => {
    console.log(`✅ Received: ${msg.content.toString()}`);
    });

}


// handler local signup 
async function postSignLocalHandler(req , res)
{
  const body_data = req.body;
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  
  body_data.ver_code      = randomNumber.toString();
  data = { data:body_data }
  
  
  try
  {
    await prisma.user.create(data)
  
    const user = await prisma.user.findUnique({where: {email : body_data.email} })
    const profile = {avatar_url : '../images/default.jpg' , display_name : 'player' ,user_id : user.id}
    await prisma.account_details.create({data:profile})
    
    await receve_rabbitmq();

    mailOptions.to = body_data.email;
    mailOptions.text = String(randomNumber);
    helper.sendEmailMessage(mailOptions)

    return res.send({check:true});
  }
  catch(error)
  {
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

  try
  {
    await prisma.user.create({data:body_data});
  
    const user = await prisma.user.findUnique({where: {email : body_data.email} })
    const profile = {avatar_url : req.body.picture , display_name : 'player' ,user_id : user.id}
    await prisma.account_details.create({data:profile});
  
  }
  catch(error)
  {
    console.log("An account with this email already exists.")
  }

  const token = await helper.fetchPOST('http://auth:4002/token/create' , body_data.email);  
  return res.send(token);
}


async function postVerifyHandler(req , res) 
{
  const {email , code} = req.body;
  const error = {verify : true};

  try {
    const user = await prisma.user.findUnique({where : { email : email , auth_provider : {not : 'google' } , is_verified : {not : true } }});

    if(user.ver_code != code)
    {
      console.log("error in ver_code")
      throw new Error('false');
    }

    await prisma.user.update({ where: { id: user.id }, data: { is_verified: true }, });

  }
  catch (error) 
  {
    console.log(" *postverifyhandler* : Something went wrong")
    error.verify = false;
  }

  return res.send(error)
}


async function postLoginHandler(req , res)
{
  const {email} = req.body;

  try 
  {
    const user = await prisma.user.findUnique({where : {email : email , auth_provider : {not : 'google'} , is_verified : {not : false}} });
    if(!user || user.password != req.body.password)
      throw new Error('false');

    const token = await helper.fetchPOST('http://auth:4002/token/create' , email);
    return res.send(token);
  
  } 
  catch (error) 
  {
    console.log('error in login user not found or  password invalid ')
  }

  return res.send({check : false});
}



async function postUpdateHandler(req , res)
{

  console.log(req.body.user_id);
  try 
  {
    await prisma.account_details.update({ where : {user_id : req.body.user_id} , data : req.body  });
  } 
  catch (error) 
  {
    console.log('error');
  }

  return res.send({msg : 'valid'})
}


module.exports = {postLoginHandler , postUpdateHandler, postVerifyHandler ,  postSignLocalHandler, postSignGoogleHandler}