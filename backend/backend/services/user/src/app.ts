import {fastify , FastifyInstance} from 'fastify';
import {userRoutes , friendRoutes} from './routes/user';
import { errorHandler } from './utils/errorHandler';
import registerPlugins from './plugins/plugins'
import prisma from './db/database'

const app: FastifyInstance = fastify();
export default app;

registerPlugins(app);

const routes = [...userRoutes , ...friendRoutes]

routes.forEach(route => {app.route(route)})

console.log("say hello user");

app.setErrorHandler(errorHandler)
