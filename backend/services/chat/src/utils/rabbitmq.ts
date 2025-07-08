import amqp from 'amqplib';
import prisma from '../db/database';

let connection:any;
let channel:any;

export async function initRabbitMQ() 
{
  connection = await amqp.connect('amqp://rabbitmq:5672');
  channel = await connection.createChannel();
  await channel.assertQueue('chat');
  await channel.assertQueue('chatservice');

  console.log("Connected to RabbitMQ");

}



export async function sendDataToQueue(data: any , queue:string) 
{
  try {


    const msgBuffer = Buffer.from(JSON.stringify(data));
    channel.sendToQueue(queue, msgBuffer);
  } 
  catch (error) 
  {
    console.log("Error in rabbit connection:", error);
  }
}



export async function receiveFromQueue()
{
  const queue:string = 'chat';

  try 
  {
      channel.consume(queue, async (msg:any) =>{

      if (msg !== null) 
        {

          const data = JSON.parse(msg.content.toString());
          delete data.type;
          
          // await prisma.message.create({data : data});
          console.log("Message received:", data);

          await sendDataToQueue(data , 'chatservice')
          channel.ack(msg);
        }

    });

  } 
  catch (err:any) 
  {
    console.error('RabbitMQ error:', err.message);
  }
}
