FROM node:lts-alpine3.19 as node_modules
WORKDIR /home/node/install
COPY package.json .
COPY package-lock.json .
RUN npm install

FROM node:lts-alpine3.19 as build
EXPOSE 8080
ENV NODE_ENV production
ENV SERVER_ENV dev
ENV PORT 8080

WORKDIR /home/node/backend
COPY --from=node_modules /home/node/install .
COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]
