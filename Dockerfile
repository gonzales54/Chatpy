FROM node:18.14.2-slim

RUN npm i -g npm@latest firebase-tools

USER node
WORKDIR /home/node/app
