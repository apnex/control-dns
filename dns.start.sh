#!/bin/bash

SERVICENAME="dns"
IMAGENAME="control-dns"

# launch & persist
docker rm -v $(docker ps -qa -f name="${SERVICENAME}" -f status=exited) 2>/dev/null
RUNNING=$(docker ps -q -f name="${SERVICENAME}")
if [[ -z "$RUNNING" ]]; then
	touch /etc/resolv.conf
	printf "[apnex/${SERVICENAME}] not running - now starting\n" 1>&2
	docker run -d -P --net host --restart=unless-stopped \
		-v ${PWD}/records.json:/usr/lib/node_modules/bind-cli/lib/records.json \
		--name "${SERVICENAME}" \
	apnex/"${IMAGENAME}"
fi