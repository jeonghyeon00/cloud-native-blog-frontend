# Automation

---
## Dockerfiles

---

server [Dockerfile](../my-blog-server/Dockerfile)
```dockerfile
FROM openjdk:19
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080-8081
```

nginx [Dockerfile](../nginx/Dockerfile)
```dockerfile
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build /etc/nginx/html/build
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
```
## Bash Scripts

---

[docker_all.sh](../scripts/docker_all.sh)
```shell
#!/bin/bash
docker-compose down || exit 1

./scripts/server.sh  || exit 1
./scripts/client.sh  || exit 1
./scripts/nginx.sh  || exit 1

docker-compose up -d || exit 1
```

[server.sh](../scripts/server.sh)
```shell
#!/bin/bash

cd my-blog-server || exit 1
./gradlew bootJar || exit 1
docker build -t toolkithi/my-spring:latest . || exit 1
docker push toolkithi/my-spring:latest || exit 1
```

[client.sh](../scripts/client.sh)
```shell
#!/bin/bash

cd my-blog || exit 1
npm run build || exit 1
rm -rf ../nginx/build || exit 1
cp -r ./build ../nginx/build || exit 1
```

[nginx.sh](../scripts/nginx.sh)
```shell
#!/bin/bash

cd nginx || exit 1
docker build -t toolkithi/mynginx:latest . || exit 1
docker push toolkithi/mynginx:latest || exit 1
```
