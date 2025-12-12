# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

ARG BACKEND_URL
ARG VITE_API_URL

ENV BACKEND_URL=$BACKEND_URL
ENV VITE_API_URL=$VITE_API_URL

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

RUN /bin/sh -c "envsubst '\$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
