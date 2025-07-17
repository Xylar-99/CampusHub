
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler( request: FastifyRequest, reply: FastifyReply ,  error: FastifyError,done:any) {
  
    if (error.validation) 
      {
    reply.status(400).send({ message: 'Validation failed', errors: error.validation, });
    } 
    else {
    reply.status(500).send({ message: 'Internal Server Error' });
    }
    done()
}


export type ApiError = {
  error: boolean;
  info :  Record<string, any>;
  message: string;
  code?: string;
  status?: number;
};

