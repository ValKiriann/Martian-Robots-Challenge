FROM node:12.16.2-stretch
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app/ .
CMD node server.js
EXPOSE 3000
USER node