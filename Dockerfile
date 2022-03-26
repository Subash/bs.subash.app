FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci

COPY build/ /app/

CMD ["node", "node_modules/.bin/forever", "index.js"]
