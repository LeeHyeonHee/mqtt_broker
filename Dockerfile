FROM node:18
WORKDIR /usr/src/mqtt_subscriber
COPY package.json .
RUN npm install
COPY . .

RUN npm run start:dev
CMD node dist/main.js