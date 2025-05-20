
const prisma = require('../db/db')

const dataUser = require('../utils/fetchUser')


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

module.exports = {getFriendsHandler}
