#!/bin/bash

cd layout
tar zcvf layout.tar.gz *
mv layout.tar.gz ../
cd ..
docker build --rm -t apnex/control-dns -f ./control-dns.docker .
rm layout.tar.gz
