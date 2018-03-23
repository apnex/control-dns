#!/usr/bin/env node
var xtable = require('./xtable.js');
var xzonedb = require('./xzonedb.js');

// constructor
var args = process.argv.slice(2);
var self = viewZones.prototype;
var $view = new xtable();
var $zonedb = new xzonedb();
module.exports = viewZones;
function viewZones($opts) {
	this.log = 0;
}

// main
self.view = function() {
	let $zones = $zonedb.load();
	console.log('-- start zone dump --')
	let $outzones = {};
	for(let $key in $zones) {
		if(!$key.match(/in-addr\.arpa/g)) {
			$outzones[$key] = [];
			for(let $node of $zones[$key]) {
				if($node.type == "A" && !$node.key.match(/^ns1\./g)) {
					console.log($node);
				}
			}
		}
	}
	for(let $key in $outzones) {
		console.log("-- zone: [" + $key + "]");
	}
	console.log('-- end zone dump --')
};

self.view(args[0]);
