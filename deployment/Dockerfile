FROM debian:bookworm-slim

RUN apt update && apt install -y nginx && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

EXPOSE 80

RUN mv /app/default /etc/nginx/sites-enabled/default

CMD ["nginx", "-g", "daemon off;"]