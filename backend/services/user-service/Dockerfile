FROM node:20

RUN apt-get update  -y && apt-get install -y openssl sqlite3 libssl-dev vim

WORKDIR /user

COPY ./src/ .

COPY ./package.json .

RUN npm install

RUN npx prisma generate

EXPOSE 4001

CMD ["npm" , "run" , "start"]