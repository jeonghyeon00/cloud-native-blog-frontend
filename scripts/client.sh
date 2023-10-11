#!/bin/bash

cd my-blog || exit 1
docker build -t toolkithi/my-react:latest . || exit 1
docker push toolkithi/my-react:latest || exit 1