
      
  import nodemailer from 'nodemailer';
  import amqp from 'amqplib';
        



const mailOptions = {
  from: 'abdoqoubai@gmail.com',
  to: 'aquaoubai@gmail.com',
  subject: 'hii',
  text: '455',
};




const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'abdoqoubai@gmail.com',
        pass: 'qfga utdh tpbw imtv', 
    },
});


function sendEmailMessage(info)
{
  if(info !== null)
  {

    const data = JSON.parse(info.content.toString());
    mailOptions.to = data.email;
    mailOptions.text = data.text;
    
    transporter.sendMail(mailOptions)
    console.log("done send message to email");
  }
    
}



async function receiveRabbitMQ() {

  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    const queue = 'emailhub';
    await channel.assertQueue(queue);

    console.log('Waiting for messages in %s. To exit press CTRL+C', queue);
    channel.consume(queue, sendEmailMessage);

  } 
  catch (err) 
  {
    console.error('RabbitMQ error:', err.message);
  }
}

receiveRabbitMQ();
