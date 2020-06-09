#!/bin/bash
hash=`git rev-parse --short HEAD`
docker build -t "subash/bs.subashpathak.com:$hash" .
docker push "subash/bs.subashpathak.com:$hash"
