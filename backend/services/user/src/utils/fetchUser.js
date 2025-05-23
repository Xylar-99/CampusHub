const prisma = require('../db/db');
const fetchPOST = require('./fetch');


async function getUserByToken(req) 
{
    const token = req.headers.authorization;
    const me = await fetchPOST('http://auth:4002/token/verify' , {token : token})
    const user = await prisma.user.findUnique({where : {email : me.email}})
    return user;
}



module.exports = {getUserByToken}