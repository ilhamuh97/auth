# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /usr/share/nginx/html/nginx.conf.template

RUN apk add --no-cache gettext

EXPOSE 80

CMD envsubst '$BACKEND_URL' < /usr/share/nginx/html/nginx.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
