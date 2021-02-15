FROM node:14

WORKDIR /usr/src/dinaryApi

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["pm2-runtime", "index.js"]