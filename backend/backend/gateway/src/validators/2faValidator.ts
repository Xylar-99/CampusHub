import {FastifyReply } from "fastify";
import app from "../app";
import prisma from "../db/database";
import { sendDataToQueue } from "../integration/rabbitmqClient";
import redis from "../integration/redisClient";
import { ApiError } from "../utils/errorHandler";


function generateToken(length = 10) 
{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}



export async function setJwtTokens(res: FastifyReply, user: any | null) 
{
  const accessToken = await app.jwt.sign({ userId: user.id }, { expiresIn: "1h" });
  const refreshToken = await app.jwt.sign({ userId: user.id }, { expiresIn: "7d" });

  res.setCookie("accessToken", accessToken, { httpOnly: true, path: "/" });
  res.setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  }); 
}






export async function isTwoFactorEnabled(res: FastifyReply, user: any | null , errorResponse: ApiError ) : Promise<any>
{
  const data  = await prisma.twofactorauth.findFirst({ where: { userId: user.id , enabled : true}})
  
  if(!data)
  {
    errorResponse.info.enabled = false;
    await setJwtTokens(res , user);
    return ;
  }
  
  errorResponse.info.enabled = true;
  errorResponse.info.tmp = generateToken();
  await redis.set(errorResponse.info.tmp, user.id, "EX", "260");

}



















