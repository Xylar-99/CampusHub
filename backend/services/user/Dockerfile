FROM node:18.19-slim

RUN apt-get update && apt-get install -y openssl sqlite3 libssl-dev

WORKDIR /user

COPY ./src/ .

COPY ./config/package.json .

COPY ./tools/* /usr/bin/

RUN npm install

EXPOSE 4001

CMD ["bash" , "/usr/bin/script.sh"]

