FROM node:22.13.1-alpine AS build

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build:sit \
    && rm -rf node_modules

FROM nginx:stable-alpine-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build --chown=appuser:appuser /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]