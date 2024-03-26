FROM node:18 as node_modules
RUN npm install

FROM node:18 as build

COPY --from=node_modules / /
COPY . .
RUN npm run build
