import dotenv from 'dotenv';
import app from './app'

dotenv.config();

const port = Number(process.env.PORT);
const host = process.env.HOST;


async function StartServer()
{
    try 
    {
        app.listen({port : port , host : host} , () => {console.log(`server listen on http://${host}:${port} ...`)})
    } 
    catch (error) 
    {
        console.log("error in server")
        process.exit(1);
    }
}


StartServer();