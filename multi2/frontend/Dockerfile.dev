FROM node:alpine

WORKDIR /opt/app

COPY ./package.json .

COPY ./public .

RUN yarn install

COPY . .

CMD ["yarn", "start"]
