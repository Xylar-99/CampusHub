
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


module.exports = {initRoutesFromConfig}