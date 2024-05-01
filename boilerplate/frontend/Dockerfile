FROM node:lts-alpine3.19 as build
WORKDIR /home/node/build
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable
EXPOSE 80

WORKDIR /home/node/frontend
COPY --from=build /home/node/build/dist /home/node/frontend
COPY --from=build /home/node/build/nginx /etc/nginx

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
