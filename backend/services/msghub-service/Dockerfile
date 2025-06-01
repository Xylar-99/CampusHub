FROM node:20

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /msghub

COPY ./src/ .

RUN npm install nodemailer amqplib

CMD ["sh", "-c", "sleep 30 && node app.js"]

