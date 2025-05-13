const User = require('../models/User')
const app = require('../services/server').app

async function getUserByUsername(username)
{
    const user = await User.findOne({ where: { username: username } });

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


module.exports = {getUserByUsername , getUserByRequest  ,getUserByToken}