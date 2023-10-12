#!/bin/bash

cd my-blog || exit 1
npm run build || exit 1
rm -rf ../nginx/build || exit 1
cp -r ./build ../nginx/build || exit 1