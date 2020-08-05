FROM node:10-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install
#RUN npm ci --loglevel verbose

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]
#CMD [ "nodemon", "server.js" ] 
