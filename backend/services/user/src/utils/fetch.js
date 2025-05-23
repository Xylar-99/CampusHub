

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


module.exports = fetchPOST;