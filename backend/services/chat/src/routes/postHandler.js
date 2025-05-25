const WebSocket = require('ws')

const clients = new Map();


async function postNewClientHandler(req , res) 
{
  // const {userId} = req.body;

  const ws = new WebSocket('ws://chat:4040');

  ws.on('open' , () => {

    console.log(`WebSocket opened for user ${'1'}`);
    clients.set('1', ws);
    console.log(clients);

  })
  return res.send({message : 'valid'});
}


async function postSendHandler(req , res) 
{
  const {message , userId } = req.body;
  const client = clients.get(String(userId));
  if(client)
  {

    console.log(ws.readyState === WebSocket.OPEN);
    console.log(clients);

    if(ws.readyState === WebSocket.OPEN)
      client.send(message);
  }
  else
    console.log('error')

  return res.send({message : 'valid'});
}


module.exports = {postSendHandler  , postNewClientHandler}