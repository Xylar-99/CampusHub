
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


module.exports = {initRoutesFromConfig , fetchPOST , me}