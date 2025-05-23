
const dataUser = require('../utils/fetchUser')


// get my user
async function getUserHandler(req , res) 
{
  const me = await dataUser.getUserByToken(req);
  return res.send(me);
}


module.exports = {getUserHandler };