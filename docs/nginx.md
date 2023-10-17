# Nginx

---

index.html & assets serving   
load balancing & reverse proxy

nginx.conf
```nginx.conf
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {                     
    worker_connections  1024;
}
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    upstream server {
        random;
        server spring_server1:8080 max_fails=3;
        server spring_server2:8081 max_fails=3;
    }
    server {
        listen 80;
        server_name localhost;
        location / {
            try_files $uri $uri/ /index.html;
            root /etc/nginx/html/build;
            index index.html;
        }
        location ^~ /api {
            proxy_pass         http://server;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;          
        }
    }
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
                                                
    sendfile        on;                                                                         
    keepalive_timeout  65;                                                                      
    include /etc/nginx/conf.d/*.conf;           
}
```
Dockerfile
```dockerfile
    FROM nginx:latest
    COPY nginx.conf /etc/nginx/nginx.conf
    COPY ./build /etc/nginx/html/build
    CMD ["nginx", "-g", "daemon off;"]
    EXPOSE 80
```

nginx.sh
```
#!/bin/bash

cd nginx || exit 1
docker build -t toolkithi/mynginx:latest . || exit 1
docker push toolkithi/mynginx:latest || exit 1

```