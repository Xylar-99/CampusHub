const WebSocket = require('ws')

// get my user
async function getUserHandler(req , res) 
{
  const ws = new WebSocket('ws://chat:4003');

  console.log(ws);
  console.log('hello wo');

  if (ws.readyState === WebSocket.OPEN) {
    console.log("✅ It's connected");
  } else {
    console.log("❌ Not connected yet");
  }

  return res.send(ws);
}


module.exports = {getUserHandler };