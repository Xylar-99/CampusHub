FROM node:20

RUN apt-get update && apt-get install -y openssl libssl-dev vim

WORKDIR /gateway

COPY ./src/ .

COPY ./config/package.json .

RUN npm install

RUN npm install @fastify/oauth2

RUN npm install @fastify/session

RUN npm install ajv-formats

RUN npm install dotenv

RUN npm install ajv

RUN npm install @fastify/multipart@latest

RUN npm install @fastify/formbody

RUN npm install amqplib

EXPOSE 4000

CMD ["npm" , "run" , "start"]

