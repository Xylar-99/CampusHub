const users = require('../utils/fetchUser');


async function getRootHandler(req , res) 
{
    return res.type('text/html').sendFile('index.html')
}

async function getProfileHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/profile.html')
}

async function getLoginFileHandler(req , res) 
{
    return res.type('text/html').sendFile('./pages/login.html')
}




async function getUserHandler(req , res) 
{
   const user = await users.getUserByRequest(req);
   const data =
   {
    fname : user.fname,
    lname : user.lname,
    username : user.username ,
   }


    return res.send(data);
}



module.exports = {getRootHandler ,getLoginFileHandler ,getUserHandler ,getProfileHandler};