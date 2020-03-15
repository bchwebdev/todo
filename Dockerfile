FROM node:12-alpine

COPY . /var/www

WORKDIR /var/www

RUN yarn

CMD ["node", "index.js"]
