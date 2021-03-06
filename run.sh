#!/bin/sh
​
#
#    Make startup less chatty by detaching mongo and the load-balancer...
#
build=${1:-""}
​
docker-compose up --detach ${build} mongo load-balancer
docker-compose up          ${build} frontend backend
​
#
#    Wait a little...
#
# sleep 10
​
#
#    What is running still?
#
docker ps
​
#
#    We're done
#
exit 0