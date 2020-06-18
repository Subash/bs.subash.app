FROM nginx:alpine

COPY nginx.conf /etc/nginx/
COPY img /public/img
COPY *.html /public/
COPY manifest.webmanifest /public/

EXPOSE 80
