FROM node:20

RUN apt-get update && apt-get install -y openssl libssl-dev vim

WORKDIR /gateway

COPY ./src/ .

COPY ./package.json .

RUN npm install

EXPOSE 4000

CMD ["npm" , "run" , "start"]

