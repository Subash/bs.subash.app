FROM nginx:alpine

ADD nginx.conf /etc/nginx/

RUN mkdir -p /public
COPY css /public/css
COPY img /public/img

RUN mkdir -p /public/js
COPY js/*-dist.js /public/js

COPY *.html /public
COPY manifest.webmanifest /public/

EXPOSE 80
