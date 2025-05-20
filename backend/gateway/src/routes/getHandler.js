
const prisma = require('../db/db')

const dataUser = require('../utils/fetchUser')

async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}




async function getProfileHandler(req , res) 
{
   return res.sendFile('./pages/profile.html')
}


async function getSettingHandler(req , res) 
{
   return res.sendFile('./pages/comp.html')
}


async function getLoginHandler(req , res) 
{
   return res.sendFile('./pages/login.html')
}


async function getMessagesHandler(req , res) 
{
   return res.sendFile('./pages/message.html')
}



//  API 

// get my user
async function getUserHandler(req , res) 
{
    const respond = await fetch('http://user:4001/user');
    return res.send(respond);
}

// get all posts
async function getPostsHandler(req , res) 
{
    const posts = await prisma.post.findMany();
    for(let i = 0 ; i < posts.length ; i++)
    {
        const profile = await prisma.profile.findUnique({where : {user_id : posts[i].userId}})
        posts[i].img_user = profile.img;
        posts[i].fullName    = profile.fullName;
    }
    return res.send(posts);
}

// get all my posts

async function getMyPostsHandler(req , res) 
{
    const my_user = dataUser.getUserByRequest(req);
    const posts = await prisma.post.findMany({where : {userId : my_user.id}})

    return res.send(posts);
}

// get all my friends
async function getFriendsHandler(req , res) 
{
    const my_user = dataUser.getUserByRequest(req);
    const friends = await prisma.friend.findUnique({where : {userId : my_user.id}})

    const users = await prisma.user.findMany({
    where: {
    userId: {
      in: friends.friendsId,
    },
    },
    });

    return res.send(users);
}

// get all users in database
async function getUsersHandler(req , res) 
{
    const myUser = await dataUser.getUserByRequest(req);
    const users = await  prisma.profile.findMany({
    where: {
    user_id: {
      not: myUser.id,
    },
    },
    });

    return res.send(users);
}




module.exports = {getRootHandler , getMessagesHandler , getMyPostsHandler, getUsersHandler ,getLoginHandler, getSettingHandler ,getFriendsHandler , getProfileHandler, getPostsHandler ,getUserHandler };