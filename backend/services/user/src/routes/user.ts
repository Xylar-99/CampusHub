import { RouteHandlerMethod , FastifySchema } from 'fastify';
import * as userController from '../controllers/user.controller';
import * as friendController from '../controllers/friend.controller';
import * as blockController from '../controllers/block.controller';
import { updateUserSchema  } from '../validators/user';


type Route = {
    method  : 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'; 
    url     : string;
    handler : RouteHandlerMethod;
    schema? : FastifySchema;
};


const userRoutes: Route[] = [

  { method: 'POST', url: '/api/users/profile', handler: userController.createProfileHandler,},
  { method: 'PUT', url: '/api/users/me', handler: userController.updateProfileHandler,},
  { method: 'DELETE', url: '/api/users/me', handler: userController.deleteProfileHandler,},
  
  { method: 'GET', url: '/api/users/me', handler: userController.getCurrentUserHandler,},
  { method: 'GET', url: '/api/users/:id', handler: userController.getUserByIdHandler },
  { method: 'GET', url: '/api/users/', handler: userController.getAllUserHandler },

];



const friendRoutes: Route[] = [

  // Friend requests
  { method: 'POST', url: '/api/friends/request', handler: friendController.sendFriendRequestHandler },
  { method: 'POST', url: '/api/friends/accept', handler: friendController.acceptFriendRequestHandler },
  { method: 'POST', url: '/api/friends/reject', handler: friendController.rejectFriendRequestHandler },

  // Friend list
  { method: 'GET', url: '/api/friends/', handler: friendController.getFriendsListHandler },
  { method: 'DELETE', url: '/api/friends/:friendId', handler: friendController.removeFriendHandler },
  
  // get frineds lists
  { method: 'GET', url: '/api/friends/pending', handler: friendController.getPendingRequestsHandler },
  

  // Block users
  { method: 'POST', url: '/api/friends/blocked/:blockId', handler: blockController.blockUserHandler },
  { method: 'DELETE', url: '/api/friends/blocked/:blockId', handler: blockController.unblockUserHandler },
  { method: 'GET', url: '/api/friends/blocked/', handler: blockController.getBlockedUsersHandler },

];



export  {friendRoutes , userRoutes};
