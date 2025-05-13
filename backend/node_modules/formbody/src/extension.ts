import { Formbody } from './types';

declare module 'express-serve-static-core' {
  export interface Request {
    form: Formbody;
  }
}
