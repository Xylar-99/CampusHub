FROM node:18.19-slim

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /gateway

COPY ./src/ .

COPY ./config/package.json .

RUN npm install

RUN npm install @fastify/oauth2


EXPOSE 4000

CMD ["npm" , "run" , "start"]

