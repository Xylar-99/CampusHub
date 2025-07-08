import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../db/database';
import { isFriendRequestExists } from '../utils/utils';




export async function blockUserHandler(req:FastifyRequest , res:FastifyReply)
{
  const {blockId} = req.params as any;
  const headers = req.headers as any;

  let friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = Number(blockId);
  friendata['status'] = 'accepted';
  

  try 
  {

    friendata = await isFriendRequestExists(friendata);
    if(!friendata)
      throw new Error("ready unblocked")
    
    const userId = friendata.userId;
    if(friendata.friendId == headers.id)
    {
      friendata.userId = friendata.friendId;
      friendata.friendId = userId;
      friendata.status = 'blocked'
    }
    

    await prisma.friendship.updateMany({
      where: {
        OR: [
          { userId: friendata.userId, friendId: friendata.friendId },
          { userId: friendata.friendId, friendId: friendata.userId }
        ]
      },
      data: friendata
    });
    
  }
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}



export async function unblockUserHandler(req:FastifyRequest , res:FastifyReply)
{
  const {blockId} = req.params as any;
  const headers = req.headers as any;

  let friendata:any = {};
  friendata['userId'] = Number(headers.id);
  friendata['friendId'] = Number(blockId);
  friendata['status'] = 'blocked';
  

  try 
  {

    friendata = await isFriendRequestExists(friendata);
    if(!friendata)
      throw new Error("ready unblocked")
    
    if(friendata.userId != headers.id)
      throw new Error("not have pers for unblocked user not block him")

    await prisma.friendship.updateMany({
      where: {
        OR: [
          { userId: friendata.userId, friendId: friendata.friendId },
          { userId: friendata.friendId, friendId: friendata.userId }
        ]
      },
      data: {status : 'accepted'}
    });
    
  }
  catch
  {
    return res.status(400).send({msg : false})
  }
  
  return res.send({msg : true})
}


export async function getBlockedUsersHandler(req:FastifyRequest , res:FastifyReply)
{
    
  const headers = req.headers as any;
  const blockedusers = await prisma.friendship.findMany({where: {userId : Number(headers.id) , status: 'blocked'}});

  const friendIds = blockedusers.map((f:any) => f.friendId);

  const profiles = await prisma.profile.findMany({
    where: {
      id: { in: friendIds }
    }
  })
  
  return res.send(profiles);
}
