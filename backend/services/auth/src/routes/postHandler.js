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
    if(Object.values(req.body).includes(''))
        return res.redirect('/');
    data = 
    {
        data:req.body
    }

    await prisma.user.create(data);
    return res.redirect('./pages/login.html');
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



async function postnewPostHandler(req , res)
{

    const user1 = await dataUser.getUserByRequest(req);


    const data_of_post = {};
    const parts = req.parts();

    for await (const part of parts) 
    {
      if (part.type === 'file')
        {
        const uploadPath = path.join('/var/www/html/frontend/uploads', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath)); 
        data_of_post.img = "../uploads/" + part.filename;
        }
      else
            data_of_post[part.fieldname] = part.value;
    
    }
    data_of_post.userId = user1.id;
    // data_of_post.username = user1.username;
    await prisma.post.create({data:data_of_post});
    return res.redirect('/profile')
}




// async function postInviteHandler(req , res)
// {
//     console.log("hello");
//     let arr = [];
    
//     const data  = {}
//     const user = await dataUser.getUserByRequest(req);
//     data.user_id = user.id;

//     const {userId} = req.body;

//     const friend = await prisma.friend.findUnique({ where: { user_id: data.user_id } });


//     if(friend)
//     {
//         if(friend.friendsId.includes(userId) == false)
//         {
//             arr = friend.friendsId;
//             arr.push(userId);
//             await friends.update({friendsId : arr} , {where : {user_id:user.id}})
//         }
//         else
//             console.log("You're already connected with this friend.");
//     }
//     else
//     {
//         arr.push(userId);
//         data.friendsId = arr;
//         friends.create(data);
//     }
//     return res.redirect('/')
// }



module.exports = {postSignHandler ,postDetailsHandler , postnewPostHandler ,postLoginHandler}