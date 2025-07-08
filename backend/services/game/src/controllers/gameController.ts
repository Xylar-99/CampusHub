import { FastifyRequest, FastifyReply } from 'fastify';


// get method controllers
async function postStartGameHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}



// post method controllers
async function getGameByIdHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}


async function postMakeMoveHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}



async function getGameStatusHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}



async function postForfeitHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}




export {postMakeMoveHandler , postStartGameHandler , getGameByIdHandler , getGameStatusHandler , postForfeitHandler}