import { FastifyInstance } from 'fastify';
import staticplugin from './staticAndBody'
import authplugin from './authPlugin'

export default async function registerPlugins(app:FastifyInstance) 
{
    await staticplugin(app);
    await authplugin(app);
    // await fastifyHttpProxy1(app)
}