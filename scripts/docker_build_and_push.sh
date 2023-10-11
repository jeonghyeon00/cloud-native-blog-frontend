#!/bin/bash
docker-compose down || exit 1

./scripts/server_build_and_push.sh  || exit 1
./scripts/client_build_and_push.sh  || exit 1

docker-compose up -d || exit 1