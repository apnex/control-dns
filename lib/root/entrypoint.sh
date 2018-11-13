#!/bin/sh

function start {
	/usr/sbin/named
	tail -f /var/log/named.log
}

function shell {
	/bin/sh
}

if [ -z "$1" ]
then
	start
else
	case $1 in
		shell)
			shell
		;;
		*)
			start
		;;
	esac
fi


