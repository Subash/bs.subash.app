FROM nginx:alpine

ADD nginx.conf /etc/nginx/

RUN mkdir -p /public
COPY img /public/img

COPY *.html /public
COPY manifest.webmanifest /public/

EXPOSE 80
