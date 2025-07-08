import { RouteHandlerMethod , FastifySchema } from 'fastify';
import * as chatController from '../controllers/chat';
import { createRoomSchema, sendMessageSchema } from '../validators/chat';


type Route = {
    method  : 'GET' | 'POST' | 'DELETE'; 
    url     : string;
    handler : RouteHandlerMethod;
    schema? : FastifySchema;
};

const chatRoutes: Route[] = [
  { method: 'GET', url: '/api/chat/rooms', handler: chatController.getChatRoomsHandler },
  { method: 'POST', url: '/api/chat/rooms', handler: chatController.postCreateRoomHandler, schema: { body: createRoomSchema } },
  { method: 'GET', url: '/api/chat/rooms/:id', handler: chatController.getRoomByIdHandler },
  { method: 'POST', url: '/api/chat/rooms/:id/messages', handler: chatController.postSendMessageHandler, schema: { body: sendMessageSchema } },
  { method: 'GET', url: '/api/chat/rooms/:id/messages', handler: chatController.getMessagesHandler },
];



export default chatRoutes;
