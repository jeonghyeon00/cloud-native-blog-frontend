#!/bin/bash
docker-compose down || exit 1

./scripts/server.sh  || exit 1
./scripts/client.sh  || exit 1
./scripts/nginx.sh  || exit 1

docker-compose up -d || exit 1