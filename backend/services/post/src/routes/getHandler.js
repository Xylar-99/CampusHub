
const prisma = require('../db/db')

const dataUser = require('../utils/fetchUser')


// get my user
async function getUserHandler(req , res) 
{
    const user = await dataUser.getUserByRequest(req);
    const profile = await prisma.profile.findUnique({where : {user_id : user.id}});

    return res.send(profile);
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




module.exports = {getMyPostsHandler , getPostsHandler };
