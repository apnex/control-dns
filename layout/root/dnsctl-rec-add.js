#!/usr/bin/env node
const execSync = require('child_process').execSync;
var xnsupdate = require('./xnsupdate.js');
var async = require('async');
var xzonedb = require('./xzonedb.js');

// constructor
var self = recAdd.prototype;
var nsupdate = new xnsupdate();
var $zonedb = new xzonedb();
function recAdd($opts) {
	this.log = 0;
}
module.exports = recAdd;

// main
self.add = function($name, $addr) {
	if($name && $addr) {
		async.series([
			function($cb) {
				nsupdate.add({
					name: $name,
					ttl: "86400",
					type: "A",
					value: $addr
				}, $cb);
			},
			function($cb) {
				nsupdate.add({
					name: ($addr.match(/[^\.]+/g).reverse().join('.') + '.in-addr.arpa'),
					ttl: "86400",
					type: "PTR",
					value: $name
				}, $cb);
			}
		]);
	}
}

// shell
var args = process.argv;
if(args[1].match(/rec-add(?:\.js)?$/g)) {
	var client = new recAdd();
	console.log('key: ' + args[2] + ' value: ' + args[3]);
	async.series([
		function($cb) {
			client.add(args[2], args[3]);
			setTimeout(function() {
				$cb(null);
			}, 100);
		},
		function($cb) {
			$zonedb.refresh($cb);
		}
	]);
}
