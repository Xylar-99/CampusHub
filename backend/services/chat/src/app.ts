import {fastify , FastifyInstance} from 'fastify';
import chatRoutes from './routes/chat';
import { errorHandler } from './utils/errorHandler';
import registerPlugins from './plugins/plugins'
import prisma from './db/database'

const app: FastifyInstance = fastify();
export default app;

registerPlugins(app);

const routes = [...chatRoutes]

routes.forEach(route => {app.route(route)})
app.setErrorHandler(errorHandler)


console.log("say hello chat");
