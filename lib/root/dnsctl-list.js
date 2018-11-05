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
self.view = function($zone) {
	let $zones = $zonedb.load();
	console.log('-- start zone dump --')
	if($zone) {
		if($zones[$zone]) {
			console.log("-- zone: [" + $zone + "]");
			$view.out($zones[$zone]);
		} else {
			console.log("-- zone: [" + $zone + "] not found!");
		}
	} else {
		for(let $key in $zones) {
			console.log("-- zone: [" + $key + "]");
			$view.out($zones[$key]);
		}
	}
	console.log('-- end zone dump --')
};

self.view(args[0]);
