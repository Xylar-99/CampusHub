FROM node:20

RUN apt-get update  -y && apt-get install -y openssl sqlite3 libssl-dev vim

WORKDIR /database

COPY ./src/ .

COPY ./config/package.json .

COPY ./tools/* /usr/bin/

RUN npm install

EXPOSE 4003

CMD ["bash" , "/usr/bin/script.sh"]