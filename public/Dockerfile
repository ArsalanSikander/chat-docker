FROM nginx:1.27.3-alpine-slim
WORKDIR /usr/share/nginx/html
EXPOSE 80
COPY build .
CMD ["nginx", "-g", "daemon off;"]
