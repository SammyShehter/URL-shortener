FROM node:lts as build

WORKDIR '/app'
COPY ./package.json ./
COPY yarn.lock ./
RUN yarn install -g --silent
COPY . ./
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]