const app = require('fastify')();
const WebSocket = require('ws');

async function StartServer()
{

const server = new WebSocket.Server({ port: 4003 });

server.on('connection', (socket) => {
  console.log('🔌 Client connected');

//   When client sends message
  socket.on('message', (msg) => {
    console.log('💬 Received:', msg.toString());

    // // Echo the message to all clients
    // server.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(`🔁 Echo: ${msg}`);
    //   }
    // });


  });

  socket.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

  console.log('🚀 WebSocket server running on ws://localhost:4003');
  // app.listen({port : 4003, host: '0.0.0.0'} , () => {console.log('server listen on abquaoub.42.fr:3000 ...')})
}

module.exports = {app , StartServer}