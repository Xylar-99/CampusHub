
const prisma = require('../db/db')

const dataUser = require('../utils/fetchUser')


// get my user
async function getUserHandler(req , res) 
{


    // const user = await dataUser.getUserByRequest(req);
    // const profile = await prisma.profile.findUnique({where : {user_id : user.id}});

    return res.send({user : "profile"});
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

module.exports = {getUserHandler , getUsersHandler };