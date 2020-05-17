#!/bin/bash

HASH=`git rev-parse --short HEAD`
docker build -t "subash/bs:$HASH" .
