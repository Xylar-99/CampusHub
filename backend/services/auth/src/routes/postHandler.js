const  app = require('../services/server').app;












async function postCreateToken(req , res) 
{

  const data = {email : req.body}
  console.log(data);
  const token = app.jwt.sign(data)
  console.log(token);
  return res.send({token : token});
}


module.exports = {postCreateToken}