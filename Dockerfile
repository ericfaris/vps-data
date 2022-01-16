# syntax docker/dockerfile:1

FROM node:16.6

WORKDIR /app

RUN mkdir -p /app/data

COPY ["package.json", "./"]

RUN npm install

COPY ./src .

ARG VPS_DATA_URI
ENV VPS_DATA_URI $VPS_DATA_URI

EXPOSE 5080

CMD [ "node", "index.js" ]
