import { RouteHandlerMethod , FastifySchema } from 'fastify';
import * as gameController from '../controllers/gameController';
import { startGameSchema, moveSchema } from '../validators/gameSchemas';


type Route = {
    method  : 'GET' | 'POST' | 'DELETE'; 
    url     : string;
    handler : RouteHandlerMethod;
    schema? : FastifySchema;
};

const gameRoutes: Route[] = [
  { method: 'POST', url: '/api/game/start', handler: gameController.postStartGameHandler, schema: { body: startGameSchema } },
  { method: 'GET', url: '/api/game/:gameId', handler: gameController.getGameByIdHandler },
  { method: 'POST', url: '/api/game/:gameId/move', handler: gameController.postMakeMoveHandler, schema: { body: moveSchema } },
  { method: 'GET', url: '/api/game/:gameId/status', handler: gameController.getGameStatusHandler },
  { method: 'POST', url: '/api/game/:gameId/forfeit', handler: gameController.postForfeitHandler },
];



export default gameRoutes;
