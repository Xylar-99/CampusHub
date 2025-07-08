import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../db/database';
import redis from '../utils/redis';



export async function createProfileHandler(req:FastifyRequest , res:FastifyReply)
{
    const body = req.body as any;
    const profile = {userId : body.id  , username : body?.username ?? `player${body.id}` , bio : body?.bio ?? 'Ready to play. Ready to win.'  , avatarUrl: body?.avatar ?? 'default.png'}
    try 
    {
        await prisma.profile.upsert({where : {userId : body.id} , update:profile , create:profile})
    } 
    catch (error)
    {
        return res.status(400).send({msg : false})
    }
    return res.send({msg : true})
}



export async function updateProfileHandler(req:FastifyRequest , res:FastifyReply)
{
    
    return res.send(req.body)
}


export async function getAllUserHandler(req:FastifyRequest , res:FastifyReply)
{
    const headers = req.headers as any;

    const friendships = await prisma.friendship.findMany();
    const friendIds =  [...new Set(friendships.flatMap((f:any) => {return [f.userId, f.friendId]}))] as any;
    if (!friendIds.includes(Number(headers.id)))
        friendIds.push(Number(headers.id));

    const profile = await prisma.profile.findMany({where : {userId : {notIn: friendIds}}});
    return res.send(profile)
}


export async function deleteProfileHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send(req.body)
}



export async function getCurrentUserHandler(req:FastifyRequest , res:FastifyReply)
{
    const headers = req.headers as any;
    const profile = await prisma.profile.findUnique({where : {userId : Number(headers.id)}})
    return res.send(profile)
}




export async function getUserByIdHandler(req:FastifyRequest , res:FastifyReply)
{
    const { id } = req.params as any;

    const profile = await prisma.profile.findUnique({where : {userId : Number(id)}})
    return res.send(profile)
}
