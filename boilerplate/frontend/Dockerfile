FROM node:lts-alpine3.19 as build
WORKDIR /home/node/build
COPY package.json .
COPY package-lock.json .
RUN npm install && npm run build

FROM nginx:stable
EXPOSE 80

WORKDIR /home/node/frontend
COPY --from=build /home/node/build/dist /home/node/frontend

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
