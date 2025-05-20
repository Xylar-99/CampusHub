const prisma = require('../db/db')
const app = require('../services/server').app



async function getUserByUsername(username)
{
    const user = await prisma.user.findUnique({ where: { username: username } });

    return user;
}


async function getUserById(_id)
{
    const user = await prisma.user.findUnique({ where: { id: _id } });

    return user;
}


async function getProfileById(_id)
{
    const profile = await prisma.profile.findUnique({ where: { user_id: _id } });

    return profile;
}





async function getUserByToken(token) 
{
    const decoded = app.jwt.verify(token);
    const user = await getUserByUsername(decoded.username);
    if(!user)
        console.error("User Not Found");
    return user;
}


async function getUserByRequest(req) 
{
    const token = req.headers.cookie.split('=')[4];
    const user = await getUserByToken(token);

    return user;
}


async function getFriends(req) 
{
    let arr_of_data = [];

    const my_user = await getUserByRequest(req);

    const db_users = await prisma.profile.findMany();

    for(let i = 0 ;i  < db_users.length ; i++)
    {
        const data = {};
  
        if(my_user.id != db_users[i].user_id)
        {
            const user = await prisma.user.findUnique({ where: { id: db_users[i].id } });

            data.fullName = db_users[i].fullName;
            data.img = db_users[i].img;
            data.id = db_users[i].id;
            data.username = user.username;          
            arr_of_data.push(data);
        }
    }
    
    return arr_of_data;
}


async function getUsers(req) 
{
    let arr_of_data = [];

    const user = await getUserByRequest(req);

    const profiles = await prisma.profile.findMany({where: {  userId: {not: user.id,},},});


    console.log(profiles);

    for(let i = 0 ; i < profiles.length ; i++)
    {
        const user = await prisma.user.findUnique({ where: { id: db_users[i].user_id } });
        profile.username = user.username;          
        
    }
    
    return arr_of_data;
}


module.exports = {getUserByUsername ,getUsers,getProfileById , getFriends , getUserByRequest  ,getUserByToken}