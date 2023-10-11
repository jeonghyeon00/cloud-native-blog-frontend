#!/bin/bash

cd ../ || exit 1
docker-compose down || exit 1
./gradlew bootJar || exit 1
docker build -t toolkithi/my-spring:latest . || exit 1
docker push toolkithi/my-spring:latest || exit 1
docker-compose up -d || exit 1