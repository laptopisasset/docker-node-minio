FROM node:alpine

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]

