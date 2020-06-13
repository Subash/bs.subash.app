#!/bin/bash
hash=`git rev-parse --short HEAD`
tag="subash/bs.subashpathak.com:$hash"
docker build --tag $tag .
docker push $tag
echo -n $tag | pbcopy
echo $tag
