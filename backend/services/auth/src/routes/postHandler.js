const  app = require('../server').app;


async function postVerifyToken(req , res) 
{
  const token = req.body.token;
  const decoded = app.jwt.verify(token);

  return res.send(decoded);
}



async function postCreateToken(req , res) 
{
  const data = {email : req.body}
  const token = app.jwt.sign(data)

  return res.send({token : token});
}


module.exports = {postCreateToken , postVerifyToken}