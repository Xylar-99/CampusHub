import { FastifyRequest, FastifyReply } from 'fastify';
import { sendToService } from '../integration/api_calls';
import fs from 'fs';
import pump from 'pump';
import { promisify } from 'util';
import { pipeline } from 'stream/promises';
const pumpAsync = promisify(pump);






async function Editprofile(req: FastifyRequest) : Promise<any>
{
    const parts = req.parts() ;
  
    const data: Record<string, any> = {};
    let filePath;
  
    for await (const part of parts)
    {
        if (part.type == 'file')
        {
            filePath = `/tmp/images/${Date.now()}-${part.filename}`;
            await pipeline(part.file, fs.createWriteStream(filePath));
            console.log('file saved');
        }
        else
            data[part.fieldname] = part.value as string;
    }

    filePath = `https://backend.abquaoub.me${filePath}`
    console.log(filePath)
    const result = {
      ...data,
      avatar: filePath,
    };
  
    console.log(result)
    return result;
}


    
  


async function proxyToUserService(req:FastifyRequest , res:FastifyReply)
{
    let body = req.body as any;
    console.log(req.method , req.url);
    if(req.url == '/api/users/me' && req.method == 'POST')
        body = await Editprofile(req)
    const data:any =  await sendToService(`http://user:4001${req.url}` , req.method , req.id , body)
    return res.send(data)
}




async function proxyToChatService(req:FastifyRequest , res:FastifyReply)
{
    const method = req.method;
    const url = req.url;

    const data:any =  await sendToService(`http://chat:4002${url}` , method , req.body)
    return res.send(data)
}



async function proxyToGameService(req:FastifyRequest , res:FastifyReply)
{
    const method = req.method;
    const url = req.url;

    const data:any =  await sendToService(`http://game:4001${url}` , method , req.body)
    return res.send(data)
}




async function proxyToNotifyService(req:FastifyRequest , res:FastifyReply)
{
    const method = req.method;
    const url = req.url;

    const data:any =  await sendToService(`http://notify:4004${url}` , method , req.body)
    return res.send(data)
}



export {proxyToNotifyService , proxyToChatService , proxyToGameService , proxyToUserService}