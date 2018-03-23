#!/bin/sh
docker exec dns zone-add lab 172.16.10.0
docker exec dns list
