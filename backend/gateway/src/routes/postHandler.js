
// const sendMail = require('../utils/mailer')

// const mailOptions = {
//   from: 'abdoqoubai@gmail.com',
//   to: 'aquaoubai@gmail.com',
//   subject: 'Hello from Node.js',
//   text: 'This is a test email sent from Node.js using Nodemailer!',
// };


async function postSignHandler(req , res)
{

  if(Object.values(req.body).includes(''))
      return res.redirect('/');

  const response = await fetch('http://user:4001/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify(req.body),
  });

  const result = await response.json();

  return res.send(result);
}



async function postLoginHandler(req , res)
{
  //   const {username } = req.body;

  //   if(Object.values(req.body).includes(''))
  //       return res.redirect('/login.html');

  //   const user = await prisma.user.findUnique({where : {username : username} });

  //   if(!user || user.password != req.body.password)
  //       return res.status(400).sendFile('./pages/login.html')

  //   mailOptions.to = user.email;
  //   mailOptions.text = "code validiton : 4h3j67";
  //   sendMail(mailOptions);
  //   const token = app.jwt.sign(req.body)

  //  return res.setCookie('token', token, config.token_config).redirect('/profile');
}



module.exports = {postSignHandler ,postLoginHandler}