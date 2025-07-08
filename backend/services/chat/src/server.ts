import dotenv from 'dotenv';
import WebSocket from 'ws';
import app from './app'

import { receiveFromQueue , sendDataToQueue , initRabbitMQ } from './utils/rabbitmq';


dotenv.config();

const port = Number(process.env.PORT);
const host = process.env.HOST;


async function StartServer()
{
    try 
    {
        app.listen({port : port , host : host} , () => {console.log(`server listen on http://${host}:${port} ...`)})
    } 
    catch (error) 
    {
        console.log("error in server")
        process.exit(1);
    }
}

// const ws = new WebSocket('ws://gateway:4000/ws');



// ws.on('open', () => {
//   console.log('Connected to Gateway');
// });


// ws.on('message', (msg:any) => {
  
//   const msgString: string = Buffer.from(msg).toString('utf8');
//   const msgJson = JSON.parse(msgString);

//   console.log('Received from Gateway:', msgJson.msg);
//   ws.send(JSON.stringify({type:"chat" , from : "2"  , to : "1" , msg:"Hello from chat"}));
// });



async function start() 
{
  
  StartServer();
  await initRabbitMQ();
  await receiveFromQueue();
  
}

start();