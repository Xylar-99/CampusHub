import redis from "../integration/redisClient";
import nodemailer from 'nodemailer'
import html from './code'




let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdoqoubai@gmail.com',
    pass: 'zuhe fyst rlzr tjfc' ,
  },
});



function generateEmailHtml(code: string): string 
{
  return html.replace('{{code}}', code);
}



async function sendEmail(email: string, code: string) 
{

  try 
  {
    await transporter.sendMail({
      from: '"ft_trandandan Bot" <abdoqoubai@gmail.com>',
      to: email,
      subject: 'Your two-factor code',
      html: generateEmailHtml(code),
    });
    
    console.log('Email sent to:', email);
  } 
  catch (error) 
  {
    console.error('Error sending email:', error);
    throw error;
  }
}




async function generate6DigitCode(): Promise<string> 
{
  const value: string = Math.floor(100000 + Math.random() * 900000).toString();
  // console.log(`verify code : ${value}`)
  // return value;
  return '999999';
}



export async function sendEmailMessage(data:any)
{
  const code: string = await generate6DigitCode();
  await redis.set(`2fa:${data.email}`, code, "EX", "260");

  // await sendEmail(data.email , code);
}









