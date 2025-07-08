import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';
import formbody from '@fastify/formbody';



const fastifyStatic_config = {
    root: '/var/www/html/frontend',
    prefix: '/',
}



export default async function registerPlugins(app:FastifyInstance) 
{
    app.register(fastifyStatic , fastifyStatic_config);
    app.register(multipart);
    app.register(formbody);
}