#!/bin/bash

# build temp layout
cd lib
tar zcvf layout.tar.gz *
mv layout.tar.gz ../
cd ..

# remove existing and rebuild image
docker rmi -f apnex/bind-cli 2>/dev/null
docker build --rm --no-cache -t apnex/bind-cli -f control-dns.docker .

# remove temp layout
rm layout.tar.gz
