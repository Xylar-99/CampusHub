const userInfo = require('../models/userDetails');
const users = require('../utils/fetchUser');


async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}


async function getLoginFileHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/login.html')
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



module.exports = {getRootHandler ,getLoginFileHandler ,getUserHandler };