import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../db/database';
import redis from '../integration/redisClient';
import QRCode from "qrcode";
import { setJwtTokens } from '../validators/2faValidator';
import { authenticator } from "otplib";





export async function setupAuthenticatorHandler(req: FastifyRequest, res: FastifyReply) 
{

  // change later  for check is enabled and not generate new secret !!!!!!!!!!
  try 
  {
    const user = await prisma.user.findFirst({where : {id : Number(req.id)}})
    if(!user) //  for only typescripte types ..  change later
      throw new Error("user not found")
  
    const secret = authenticator.generateSecret();
    const serviceName = "ft_trandandan";
    
    const otpauth = authenticator.keyuri(user.username, serviceName, secret);
    
    const key = otpauth.split('=')[1].split('&')[0]
    const url  = await QRCode.toDataURL(otpauth);

    await prisma.twofactorauth.upsert({ where: { userId: user.id }, 
      update: { secret: secret,},
      create: { userId: user.id ,  secret: secret},
    });
    
    
    return res.send({url , key})
  } 
  catch {}

  return res.status(400).send({msg : false})
}






export async function verifyTwofaHandler(req: FastifyRequest, res: FastifyReply) 
{
  const body = req.body as any;
  const id = await redis.get(body.token);
  let user:any = {id : Number(id)};
  try
  {
    const twoFA = await prisma.twofactorauth.findFirst({ where: { userId: Number(id) , enabled : true } });
    if (!twoFA)
      throw new Error('2FA is not enabled yet');

    const isValid = authenticator.check(body.code, twoFA.secret);
    if (!isValid)
      throw new Error('Invalid code');

  } 
  catch 
  {
    return res.status(400).send({ msg: false });
  }
  await setJwtTokens(res , user);
  return res.send({ msg: true });
}






export async function disable2FAHandler(req: FastifyRequest, res: FastifyReply) 
{
  const id = req.id as any;

  try 
  {
    const twoFA = await prisma.twofactorauth.findFirst({ where: { userId: Number(id)  , enabled : false} });
    if (twoFA) 
      throw new Error('2FA ready disabled');

    await prisma.twofactorauth.update({ where: { userId: Number(id) }  , data : {enabled : false}})

  } 
  catch 
  {
    return res.status(400).send({ msg: false });
  }

  return res.send({ msg: true });
}



export async function enableTwoFAHandler(req: FastifyRequest, res: FastifyReply) 
{
  const body = req.body as any;
  const id = req.id as any;

  try 
  {
    const twoFA = await prisma.twofactorauth.findFirst({ where: { userId: Number(id)  , enabled : false} });
    if (!twoFA)
      throw new Error('2FA ready enabled');

    const isValid = authenticator.check(body.code, twoFA.secret);

    if (!isValid)
      throw new Error('Invalid code');

    await prisma.twofactorauth.update({ where: { userId: Number(id) }  , data : {enabled : true}})


  } 
  catch 
  {
    return res.status(400).send({ msg: false });
  }

  return res.send({ msg: true });
}