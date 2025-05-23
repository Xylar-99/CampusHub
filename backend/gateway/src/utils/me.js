

async function me(req) 
{
    const cookies = req.headers.cookie;
    const token = cookies.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const respond =  await fetch(`http://user:4001/me`, { 
            method: 'GET',
            headers: { 'Authorization': token},
    })
    
    const whoami = await respond.json();
    return whoami;
}


module.exports = me;