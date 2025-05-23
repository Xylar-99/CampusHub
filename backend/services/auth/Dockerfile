FROM node:20

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /auth

COPY ./src/ .

COPY ./config/package.json .

RUN npm install

EXPOSE 4002

CMD ["npm" , "run" , "start"]

