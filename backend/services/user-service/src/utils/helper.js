const nodemailer = require('nodemailer');



const config = {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  's',

  };

async function fetchPOST(url , body)
{
    config.body = JSON.stringify(body);
    const response = await fetch(url, config);
    const res = await response.json();

    return res;
}


///////////////////////////////////////////////



async function getUserByToken(req) 
{
    const token = req.headers.authorization;
    const me = await fetchPOST('http://auth:4002/token/verify' , {token : token})
    const user = await findUnique('user' , {where : {email : me.email}})
    return user;
}

///////////////////////////////////////////////




function initRoutesFromConfig(route)
{
    const data = {
        method : route.method,
        url : route.url,
        handler : route.handler,
    }
    
    if(route.schema)
        data.schema = route.schema;
    return data;
}

///////////////////////////////////////////////


async function create(table , _data) 
{
  const res = await fetchPOST(`http://database:4003/store/${table}` , _data)
  return res;
}


//////////////////////////////////////////////


async function findUnique(table , _data) 
{
  const res = await fetchPOST(`http://database:4003/find/${table}` , _data)
  return res;
}


/////////////////////////////////////////////


async function update(table , _data) 
{
  const res = await fetchPOST(`http://database:4003/update/${table}` , _data)
  return res;
}


/////////////////////////////////////////////


module.exports = {initRoutesFromConfig  , update  , create , findUnique , getUserByToken , fetchPOST }