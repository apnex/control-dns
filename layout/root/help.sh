#!/bin/bash

cat <<-HELP
	-- dnsctl command list --
	list [ <zone> ]
	load [ <file> ]
	dump [ <zone> ]
	zone-add <zone> <subnet>
	zone-del <zone>
	rec-add <node> <address>
	rec-del <node>
	help
HELP
