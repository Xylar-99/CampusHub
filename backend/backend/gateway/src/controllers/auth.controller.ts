import { FastifyRequest, FastifyReply } from 'fastify';
import { sendVerificationEmail } from '../utils/verification_messenger';
import { OAuth2Namespace } from '@fastify/oauth2';
import { setJwtTokens } from '../validators/2faValidator';
import { isUserVerified , isUserAlreadyRegistered  , isUserAllowedToLogin} from '../validators/userStatusCheck';
import { createAccount } from '../utils/utils';
import { isTwoFactorEnabled } from '../validators/2faValidator';
import { ApiError } from '../utils/errorHandler';

import redis from '../integration/redisClient';
import prisma from '../db/database';
import app from '../app';


declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}




export async function getRootHandler(req:FastifyRequest , res:FastifyReply)
{
    return res.send({msg : "hello ft_trandandan"})
}


export async function postSignupHandler(req:FastifyRequest , res:FastifyReply)
{
    const body = req.body as any;
    console.log('here singup ')
    try
    {
      await isUserAlreadyRegistered(body);
      await sendVerificationEmail(body);
    }
    catch (error) 
    {
      if (error instanceof Error)
        return res.status(400).send({message : error.message})
    }
  return res.send({msg : true})
}



export async function verifyEmailHandler(req:FastifyRequest , res:FastifyReply)
{
    const body = req.body as any;

    try 
    {
      await isUserVerified(body);
      const data = await redis.get(body.email);

      { // change him later

        if(!data)
          throw new Error("s")
      }

      const parsed = JSON.parse(data);
      await createAccount(parsed);
    }
    catch (error) 
    {
      if (error instanceof Error)
        return res.status(400).send({message : error.message})
    }

  return res.send({msg : true})
}





export async function postLoginHandler(req:FastifyRequest , res:FastifyReply)
{
    const body = req.body as any;
    const errorResponse : ApiError = {error : true , message : '' , info : {}};

    try 
    {
      const user = await prisma.user.findUnique({ where: { email: body.email}})
      if(!user) // for syntax  i ready check inside isuserallowed... ?
        throw new Error("user not found")

      await isUserAllowedToLogin(body , user);
      await isTwoFactorEnabled(res , user , errorResponse);
    }
    catch (error) 
    {
      if (error instanceof Error)
        {
          errorResponse.message = error.message;
          return res.status(400).send(errorResponse)
        }
    }
    
  return res.send(errorResponse)
}



export async function postLogoutHandler(req:FastifyRequest , res:FastifyReply)
{

  res.clearCookie('accessToken', { path : '/' , httpOnly: true });
  res.clearCookie('refreshToken', { path : '/' , httpOnly: true });

  return res.send({msg : true})
}






export async function getGooglCallbackehandler(req:FastifyRequest , res:FastifyReply) 
{
  const errorResponse : ApiError = {error : true , message : '' , info : {}};

  try 
  {
    const tokengoogle:any = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const result = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${tokengoogle.token.access_token}` } });
    const data = await result.json();

    data['avatar'] = data.picture
    data['username'] = data.email.split('@')[0];
    data['fname'] = data.given_name;
    data['lname'] = data.family_name;
    
    const user = await createAccount(data);
    await isTwoFactorEnabled(res , user , errorResponse);

  }
  catch (error) 
  {
      return res.status(400).send({msg : false})
  }
  
  if(errorResponse.info.enabled)
    return res.redirect(`https://abquaoub.me/pages/2faEnable.html?token=${errorResponse.info.tmp}`)

  return res.redirect('https://abquaoub.me/pages/profile.html')
  // return res.send(errorResponse)
}



export async function getIntrahandler(req:FastifyRequest , res:FastifyReply) 
{

  const client_id = process.env.IDINTRA;
  const url =  `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=https%3A%2F%2Fbackend.abquaoub.me%2Fauth%2Fintra%2Fcallback&response_type=code`;

 return  res.redirect(url)
}





export async function getIntracallbackhandler(req:FastifyRequest , res:FastifyReply) 
{
  const errorResponse : ApiError = {error : true , message : '' , info : {}};
  const {code} = req.query as any;

  const body:object = {
      grant_type: 'authorization_code',
      client_id: process.env.IDINTRA,
      client_secret: process.env.SECRETINTRA,
      code: code,
      redirect_uri: 'https://backend.abquaoub.me/auth/intra/callback',
    }

  const tokens = await fetch('https://api.intra.42.fr/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });


  const tokensJSON = await tokens.json();
  const access_token = tokensJSON.access_token;

  const user = await fetch('https://api.intra.42.fr/v2/me', {headers: {  Authorization: `Bearer ${access_token}`,}, });
  const userJSON = await user.json();

  
  userJSON['fname'] = userJSON.first_name;
  userJSON['lname'] = userJSON.last_name;
  userJSON['avatar'] = userJSON.image.link;
  userJSON['username'] = userJSON.login;

  const account = await createAccount(userJSON);
  await isTwoFactorEnabled(res , account , errorResponse);
  
  if(errorResponse.info.enabled)
    return res.redirect(`https://abquaoub.me/pages/2faEnable.html?token=${errorResponse.info.tmp}`)

  return res.redirect('https://abquaoub.me/pages/profile.html')
}





export async function postrefreshtokenHandler(req:FastifyRequest , res:FastifyReply)
{
    const body = req.body as any;

    const payload: any = await app.jwt.verify(body.refreshToken);
    const id: string = payload.userId;

    const newAccessToken = await app.jwt.sign({ userId: id } , { expiresIn: '1h' });

    res.send({ accessToken: newAccessToken });
}





export async function getUserCallbackhandler(req: FastifyRequest, res: FastifyReply) 
{
  
  const id = req.id as any;
  const user = await fetch(`http://user:4001/api/users/${String(id)}`);
  
  const data = await user.json();
  return res.send(data);
}


