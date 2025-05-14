const app = require('../services/server').app;
const users = require('../utils/fetchUser') 
const path = require('path')

const config = require('../controllers/settings')

const util = require('util');
const pump = util.promisify(require('stream').pipeline);
const fs = require('fs')

const User = require('../models/User')
const userInfo = require('../models/userDetails');
const newPost = require('../models/newPost');
const friends = require('../models/friends');
const { where, ARRAY } = require('sequelize');

async function postSignHandler(req , res)
{
    if(Object.values(req.body).includes(''))
        return res.redirect('/');

    User.create(req.body);
    return res.redirect('./pages/login.html');
}



async function postLoginHandler(req , res)
{
    if(Object.values(req.body).includes(''))
        return res.redirect('/login.html');

    const user = await users.getUserByUsername(req.body.username);

    if(!user || user.password != req.body.password)
        return res.status(400).sendFile('./pages/login.html')

    const token = app.jwt.sign(req.body)

   return res.setCookie('token', token, config.token_config).redirect('/');
}




async function postDetailsHandler(req , res)
{

    const user1 = await users.getUserByRequest(req);


    const data_of_user = {};
    const parts = req.parts();

    for await (const part of parts) 
    {
      if (part.type === 'file')
        {
        const uploadPath = path.join(__dirname, '../../frontend/images', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath)); 
        data_of_user.img = "../images/" + part.filename;
        }
      else
            data_of_user[part.fieldname] = part.value;
    
    }
    data_of_user.user_id = user1.id;

    userInfo.create(data_of_user);
    return res.redirect('/')
}



async function postnewPostHandler(req , res)
{

    const user1 = await users.getUserByRequest(req);


    const data_of_post = {};
    const parts = req.parts();

    for await (const part of parts) 
    {
      if (part.type === 'file')
        {
        const uploadPath = path.join(__dirname, '../../frontend/uploads', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath)); 
        data_of_post.img = "../uploads/" + part.filename;
        }
      else
            data_of_post[part.fieldname] = part.value;
    
    }
    data_of_post.user_id = user1.id;

    console.log(data_of_post);

    newPost.create(data_of_post);
    return res.redirect('/')
}




async function postInviteHandler(req , res)
{
    let arr = [];
    
    const data  = {}
    const user = await users.getUserByRequest(req);
    data.user_id = user.id;

    const {userId} = req.body;

    const friend = await friends.findOne({ where: { user_id: data.user_id } });


    if(friend)
    {
        if(friend.friends_id.includes(userId) == false)
        {
            arr = friend.friends_id;
            arr.push(userId);
            await friends.update({friends_id : arr} , {where : {user_id:user.id}})
        }
        else
            console.log("You're already connected with this friend.");
    }
    else
    {
        arr.push(userId);
        data.friends_id = arr;
        friends.create(data);
    }
    return res.redirect('/pages/friends.html')
}



module.exports = {postSignHandler , postInviteHandler , postnewPostHandler , postDetailsHandler , postLoginHandler}