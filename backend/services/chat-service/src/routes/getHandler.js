const helper = require('../utils/helper')


// get my user
async function getUserHandler(req , res) 
{
  const me = await helper.getUserByToken(req);
  const profile = await helper.findUnique('account_details' , {where: {user_id : me.id} })
  profile.name = me.name;
  
  return res.send(profile);
}


module.exports = {getUserHandler };