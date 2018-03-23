#!/usr/bin/env node
const execSync = require('child_process').execSync;
var xrndc = require('./xrndc.js');
var xzonedb = require('./xzonedb.js');
var async = require('async');

// constructor
var $rndc = new xrndc();
var $zonedb = new xzonedb();
var self = zonedel.prototype;
var args = process.argv.slice(2);
function zonedel($opts) {
	this.log = 0;
}
module.exports = zonedel;

self.run = function($zone) {
	if($zone) {
		async.series([
			function($cb) {
				$rndc.del($zone, $cb);
			},
			function($cb) {
				console.log('delete [' + $zone + '] finished');
				$zonedb.refresh($cb);
			}
		]);
	}
}

self.run(args[0]);
