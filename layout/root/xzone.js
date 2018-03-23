#!/usr/bin/env node
const fs = require('fs');
const hd = require('heredoc');
var xrules = require('./xrules.js');

// constructor
var self = xzone.prototype;
function xzone($opts) {
	//this.cache = {};
}
module.exports = xzone;

self.parse = function($data) {
        var $data = $data.replace(/\s+/g, " ");

	let $dns = xrules.dns;
	let $zone = xrules.zone;
	let $rule = new RegExp('(?:' + $zone.pattern + ')|(?:' + $dns.pattern + ')', "g");
	let $fields = [ // update to perform field merge
		'zone',
		'key',
		'ttl',
		'view',
		'type',
		'value'
	];

	var $match;
	var zone;
	var $tables = {};
	while($match = $rule.exec($data)) {
		let $vals = $match.slice(1);
		if($vals[0]) {
			zone = $vals[0];
		}
		if($vals[1]) {
			if(zone) {
				let $entry = {};
				for(let $key in $vals) {
					if($vals[$key]) {
						$entry[$fields[$key]] = $vals[$key];
					}
				}
				if(!$tables[zone]) {
					$tables[zone] = [];
				}
				$tables[zone].push($entry);
			}
		}
	}
	return $tables;
}

// shell
var args = process.argv;
if(args[1].match(/xzone.js$/g)) {
	var client = new xzone();
	return client.parse(args[2]);
}
