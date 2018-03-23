#!/bin/bash

#docker run -d -P --net host --cap-add=SYS_TIME --cap-add=SYS_NICE apnex/alpine-ntp
#docker run -d -P --net host apnex/alpine-etcd

echo "-- shutting down running containers --"
docker rm -f -v $(docker ps -q)
echo "-- removing untagged containers --"
docker rmi -f $(docker images -q --filter dangling=true)
echo "-- removing orphaned volumes --"
docker rm -v $(docker ps -a -q -f status=exited)

echo "-- starting constellation --"
docker run -d -P --net host --name dns --restart=unless-stopped apnex/control-dns
#docker run -d -P --net host --name pxe apnex/control-pxe
#docker run -d -p 5081:80 --name node-esx apnex/node-esx
#docker run -d -p 5082:80 --name node-centos apnex/node-centos
