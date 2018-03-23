#!/usr/bin/env node
var async = require('async');
var xzone = require('./xzone.js');
var xfile = require('./xfile.js');
var xrndc = require('./xrndc.js');

// constructor
var args = process.argv.slice(2);
let $zone = new xzone();
let $file = new xfile();
let $rndc = new xrndc();
module.exports = zoneDb;
function zoneDb($opts) {
	this.log = 0;
	//this.dir = '/var/bind/';
	this.dir = './';
}
var self = zoneDb.prototype;

// main
//var $bindDir = './';
var $bindDir = '/var/bind/';
self.refresh = ($call) => {
	async.waterfall([
		function($cb) {
			$rndc.dump($cb);
		},
		function($cb) {
			$file.read($bindDir + 'named_dump.db', $cb);
		},
		function($data, $cb) {
			let $schema = $zone.parse($data);
			$cb(null, $schema);
		},
		function($schema, $cb) {
			$file.write($bindDir + 'zonedb.json', JSON.stringify($schema), $cb);
		}
	], function() {
		if($call) {
			$call(null);
		}
	});
};
self.load = function() {
	return require($bindDir + 'zonedb.json');
};
