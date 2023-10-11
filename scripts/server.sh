#!/bin/bash

cd my-blog-server || exit 1
./gradlew bootJar || exit 1
docker build -t toolkithi/my-spring:latest . || exit 1
docker push toolkithi/my-spring:latest || exit 1
