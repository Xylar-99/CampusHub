const User = require('../models/User')
const app = require('../services/server').app

const profiles = require('../models/userDetails')

async function getUserByUsername(username)
{
    const user = await User.findOne({ where: { username: username } });

    return user;
}


async function getUserById(_id)
{
    const user = await User.findOne({ where: { id: _id } });

    return user;
}


async function getProfileById(_id)
{
    const user = await profiles.findOne({ where: { user_id: _id } });

    return user;
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

    const db_users = await profiles.findAll();

    for(let i = 0 ;i  < db_users.length ; i++)
    {
        const data = {};
  
        if(my_user.id != db_users[i].user_id)
        {
            const user = await User.findOne({ where: { id: db_users[i].id } });

            console.log(user);
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

    const my_user = await getUserByRequest(req);
    const db_users = await profiles.findAll();

    for(let i = 0 ; i < db_users.length ; i++)
    {
        const data = {};
  
        if(my_user.id != db_users[i].user_id)
        {
            const user = await User.findOne({ where: { id: db_users[i].user_id } });

            console.log(user);
            data.fullName = db_users[i].fullName;
            data.img = db_users[i].img;
            data.id = db_users[i].id;
            data.username = user.username;          
            arr_of_data.push(data);
        }
    }
    
    return arr_of_data;
}


module.exports = {getUserByUsername ,getUsers , getFriends , getUserByRequest  ,getUserByToken}