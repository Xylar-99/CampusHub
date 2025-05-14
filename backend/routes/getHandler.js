const userInfo = require('../models/userDetails');
const users = require('../utils/fetchUser');
const posts = require('../models/newPost')

async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}



async function getUserHandler(req , res) 
{
    const user = await users.getUserByRequest(req);
    const profile = await userInfo.findOne({ where: { user_id: user.id } });


   const data =
   {
    fullName : profile.fullName,
    bio      : profile.bio,
    location : profile.location,
    phone    : profile.phone ,
    img      : profile.img,
   }

    return res.send(data);
}




async function getPostsHandler(req , res) 
{
    const user = await users.getUserByRequest(req);
    const profile = await userInfo.findOne({ where: { user_id: user.id } });
    const postss = await posts.findAll({ where: { user_id: user.id } })


    const data = [];

    postss.forEach(post => {
    const data1 =
        {
         fullName : profile.fullName,
         title      : post.title,
         content : post.content,
         img      : post.img,
        }
    
    data.push(data1);
    })

    return res.send(data);
}




module.exports = {getRootHandler , getPostsHandler ,getUserHandler };