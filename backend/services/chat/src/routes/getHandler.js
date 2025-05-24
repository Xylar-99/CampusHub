const WebSocket = require('ws')

const clients = new Map();


// get my user
async function getUserHandler(req , res) 
{
  const ws = new WebSocket('ws://chat:4040');
  clients.set('1', ws);

  return res.send({message : 'valid'});
}



// get my user
async function postSendHandler(req , res) 
{

  clients.get('1').send('hello world new message');
  return res.send({message : 'valid'});
}



module.exports = {getUserHandler , postSendHandler };