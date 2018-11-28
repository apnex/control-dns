#!/bin/sh

function start {
	/usr/sbin/named
	bind-cli record.import
	tail -f /var/log/named.log
}

function shell {
	/bin/sh
}

function setup {
	cat /root/bind-cli
}

if [ -z "$1" ]
then
	start
else
	case $1 in
		shell)
			shell
		;;
		setup)
			setup
		;;
		*)
			start
		;;
	esac
fi


