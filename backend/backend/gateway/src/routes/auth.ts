import { RouteHandlerMethod , preValidationHookHandler , FastifySchema } from 'fastify';
import * as authController from '../controllers/auth.controller';
import * as twofaController from '../controllers/2fa.controller';
import { loginSchema, signupSchema , verifyEmailSchema } from '../validators/authSchemas';


type Route = {
    method  : 'GET' | 'POST' | 'DELETE'; 
    url     : string;
    handler : RouteHandlerMethod;
    schema? : FastifySchema;
};


const authRoutes: Route[] = [

  // Auth routes
  {
    method: "GET",
    url: "/",
    handler: authController.getRootHandler,
  },
  {
    method: "POST",
    url: "/api/signup",
    handler: authController.postSignupHandler,
    schema: { body: signupSchema },
  },
  {
    method: "POST",
    url: "/api/login",
    handler: authController.postLoginHandler,
    schema: { body: loginSchema },
  },
  {
    method: "POST",
    url: "/api/logout",
    handler: authController.postLogoutHandler,
  },


  // verify email
  {
    method: "POST",
    url: "/api/verify-email",
    handler: authController.verifyEmailHandler,
    schema: { body: verifyEmailSchema },
  },



  // oauth2
  {
    method: "GET",
    url: "/auth/google/callback",
    handler: authController.getGooglCallbackehandler,
  },
  {
    method: "GET",
    url: "/api/intra",
    handler: authController.getIntrahandler,
  },
  {
    method: "GET",
    url: "/auth/intra/callback",
    handler: authController.getIntracallbackhandler,
  },


  // refresh token
  {
    method: "POST",
    url: "/refresh-token",
    handler: authController.postrefreshtokenHandler,
  },

  // edit profile
  
  // 2fa 
  {
    method: "GET",
    url: "/api/2fa/setup",
    handler: twofaController.setupAuthenticatorHandler,
  },
  {
    method: "POST",
    url: "/api/2fa/verify",
    handler: twofaController.verifyTwofaHandler,
  },
  {
    method: "POST",
    url: "/api/2fa/disable",
    handler: twofaController.disable2FAHandler,
  },
  {
    method: "POST",
    url: "/api/2fa/enable",
    handler: twofaController.enableTwoFAHandler,
  },

];



export {authRoutes}
