#!/bin/sh
# Copy secret nginx config to Nginx folder
cp /etc/secrets/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
nginx -g "daemon off;"
