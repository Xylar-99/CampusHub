const db = require('../db/db').db;
const app = require('../services/server').app;
const users = require('../utils/fetchUser') 


async function postSignHandler(req , res)
{
    if(Object.values(req.body).includes(''))
    {
        console.log("Value cannot be left empty.");
        return res.redirect('/');
    }

    const sql = 'INSERT INTO users (fname , lname  , username , email , password) VALUES ( ? , ? , ? , ? , ?) '
    const err = new Promise((resolve , reject) => {
        db.run(sql , Object.values(req.body) , (err) => {if(err) reject(err); })
    })
    

    return res.redirect('/login.html');
}



async function postLoginHandler(req , res)
{
    if(Object.values(req.body).includes(''))
    {
        console.log("Value cannot be left empty.");
        return res.redirect('/login.html');
    }

    const user = await users.getUserByUsername(req.body.username);

    if(!user || user.password != req.body.password)
    {
        console.log("Username or password is incorrect. Please try again.");
        return res.status(400).sendFile('./pages/login.html')
    }


    const token = app.jwt.sign(req.body)

    const token_config = {
    httpOnly: true, 
    path: '/',
    secure: false,  
    maxAge: 3600
  }

   return res.setCookie('token', token, token_config).redirect('/profile');
}


module.exports = {postSignHandler , postLoginHandler}