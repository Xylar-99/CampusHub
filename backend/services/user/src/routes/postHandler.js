const prisma = require('../db/db')
const dataUser = require('../utils/fetchUser')

const app = require('../services/server').app;
const config = require('../controllers/settings')

const path = require('path')
const util = require('util');
const pump = util.promisify(require('stream').pipeline);
const fs = require('fs')


const sendMail = require('../utils/mailer')

const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'Hello from Node.js',
  text: 'This is a test email sent from Node.js using Nodemailer!',
};


async function postSignHandler(req , res)
{



    // data = 
    // {
    //     data:req.body
    // }

    // await prisma.user.create(data);
  console.log(req.body);

    return res.send(req.body);
}



async function postLoginHandler(req , res)
{
    const {username } = req.body;

    if(Object.values(req.body).includes(''))
        return res.redirect('/login.html');

    const user = await prisma.user.findUnique({where : {username : username} });

    if(!user || user.password != req.body.password)
        return res.status(400).sendFile('./pages/login.html')

    mailOptions.to = user.email;
    mailOptions.text = "code validiton : 4h3j67";
    sendMail(mailOptions);
    const token = app.jwt.sign(req.body)

   return res.setCookie('token', token, config.token_config).redirect('/profile');
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

module.exports = {postLoginHandler, postDetailsHandler, postSignHandler}