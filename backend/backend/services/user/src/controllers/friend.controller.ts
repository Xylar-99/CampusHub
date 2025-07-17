import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../db/database';
import { isFriendRequestExists } from '../utils/utils';

export async function sendFriendInvite(data:any) 
{
    delete data.type;
    
    try 
    {
      if(!await isFriendRequestExists(data))
        await prisma.friendship.create({data : data})
    } 
    catch (error) 
    {
      console.log("error in invite friend")  
    }

}


export async function getFriendsListHandler(req:FastifyRequest , res:FastifyReply)
{

  const headers = req.headers as any;
  const friendships = await prisma.friendship.findMany({
    where: 
    {
      status: 'accepted',
      OR: [
        { userId: Number(headers.id)},
        { friendId: Number(headers.id) }
        ]
    }
  });
  
  
 
  const friendIds = friendships.map((f:any) => {return (Number(headers.id) != f.userId) ? f.userId : f.friendId });
  const profiles = await prisma.profile.findMany({ where: { id: { in: friendIds } } })
  
  return res.send(profiles);
}


export async function getPendingRequestsHandler(req:FastifyRequest , res:FastifyReply)
{

  const headers = req.headers as any;
  const friendships = await prisma.friendship.findMany({
    where: {friendId : Number(headers.id) , status: 'pending'}
  });
  
  const friendIds:any = friendships.map((arg:any) => {return arg.userId});

  const profiles = await prisma.profile.findMany({
    where: {
      id: { in: friendIds }
    }
  })

  return res.send(profiles);
}



export async function sendFriendRequestHandler(req:FastifyRequest , res:FastifyReply)
{
  const body = req.body as any;
  const headers = req.headers as any;

  const friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = body.friendId;
  friendata['status'] = 'pending';
  
  console.log(friendata);

  try 
  {
    if(await isFriendRequestExists(friendata))
      throw new Error("ready exist friends")

    await prisma.friendship.create({data : friendata})
  } 
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}


export async function acceptFriendRequestHandler(req:FastifyRequest , res:FastifyReply)
{
  const body = req.body as any;
  const headers = req.headers as any;

  const friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = body.friendId;
  friendata['status'] = 'accepted';
  

  try 
  {
    if(await isFriendRequestExists(friendata))
      throw new Error("ready exist friends")
  
    await prisma.friendship.updateMany({
      where: {
        OR: [
          { userId: friendata.userId, friendId: friendata.friendId },
          { userId: friendata.friendId, friendId: friendata.userId }
        ]
      },
      data: { status: 'accepted' }
    });
    
  }
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}


export async function rejectFriendRequestHandler(req:FastifyRequest , res:FastifyReply)
{
  const body = req.body as any;
  const headers = req.headers as any;

  const friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = body.friendId;
  friendata['status'] = 'pending';
  

  try 
  {
    if(!await isFriendRequestExists(friendata))
      throw new Error("ready reject friends")
  
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId: friendata.userId, friendId: friendata.friendId },
          { userId: friendata.friendId, friendId: friendata.userId }
        ]
      }
    });
  }
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}



export async function removeFriendHandler(req:FastifyRequest , res:FastifyReply)
{

  const {friendId} = req.params as any;
  const headers = req.headers as any;

  const friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = friendId;
  friendata['status'] = 'accepted';
  

  try 
  {
    if(!await isFriendRequestExists(friendata))
      throw new Error("ready is not friends")
  
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId: friendata.userId, friendId: friendata.friendId },
          { userId: friendata.friendId, friendId: friendata.userId }
        ]
      }
    });
    
  } 
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}


export async function cancelFriendRequestHandler(req:FastifyRequest , res:FastifyReply)
{
    
}

export async function getSentRequestsHandler(req:FastifyRequest , res:FastifyReply)
{
    
}


export async function getReceivedRequestsHandler(req:FastifyRequest , res:FastifyReply)
{
    
}