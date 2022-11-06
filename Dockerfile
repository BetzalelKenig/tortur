FROM node:14

RUN apt-get update

RUN apt-get install -y tor

WORKDIR /usr/src/app

RUN npm i -g typescript

RUN npm i -g nodemon

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8777

RUN /usr/bin/tor --RunAsDaemon 1

CMD [ "node", "dist/server.js" ]