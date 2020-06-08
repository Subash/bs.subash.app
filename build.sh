#!/bin/bash

HASH=`git rev-parse --short HEAD`
docker build -t "subash/bs.subashpathak.com:$HASH" .
docker push "subash/bs.subashpathak.com:$HASH"
