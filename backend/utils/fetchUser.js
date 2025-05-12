const db = require('../db/db').db
const app = require('../services/server').app

async function getUserByUsername(username)
{
    const sql = 'SELECT * FROM users WHERE username = ?';

    const user = new Promise((resolve , reject ) => {
        db.get(sql , [username] , (err , rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    })

    return user;
}

async function getUserByToken(token) 
{
    const decoded = app.jwt.verify(token);
    const user = await getUserByUsername(decoded.username);
    if(!user)
        console.error("User Not Found");
    return user;
}


async function getUserByRequest(req) 
{
    const token = req.headers.cookie.split('=')[4];
    const user = await getUserByToken(token);

    return user;
}


module.exports = {getUserByUsername , getUserByRequest  ,getUserByToken}