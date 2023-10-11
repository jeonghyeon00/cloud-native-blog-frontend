#!/bin/bash

cd nginx || exit 1
docker build -t toolkithi/mynginx:latest . || exit 1
docker push toolkithi/mynginx:latest || exit 1