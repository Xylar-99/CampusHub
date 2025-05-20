
const nodemailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');






const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'abdoqoubai@gmail.com',
    pass: 'qfga utdh tpbw imtv', 
  },
});

// const mailOptions = {
//   from: 'abdoqoubai@gmail.com',
//   to: 'aquaoubai@gmail.com',
//   subject: 'Hello from Node.js',
//   text: 'This is a test email sent from Node.js using Nodemailer!',
// };


function sendMail(options)
{
    transporter.sendMail(options , (err ,info) =>
    {
        if(err)
            console.log(err)
        // else
        //     console.log(info)
    });

}



module.exports = sendMail;