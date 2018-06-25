#!/bin/bash

TAG=$1

echo "--> Building... "
docker build -t battute_api . 
echo "--> Build OK"

echo "--> Create tag"
docker tag battute_api registry.orchestra.it/random/battute_api:$TAG
echo "--> Pust to registry.orchestra.it"
docker push registry.orchestra.it/random/battute_api:$TAG

echo "--> OK"
