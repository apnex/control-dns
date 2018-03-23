#!/usr/bin/env node
const execSync = require('child_process').execSync;
var args = process.argv.slice(2);
var xrndc = require('./xrndc.js');
var xnsupdate = require('./xnsupdate.js');
var async = require('async');
var xzonedb = require('./xzonedb.js');

// constructor
var args = process.argv.slice(2);
var self = recDel.prototype;
var $rndc = new xrndc();
var $zonedb = new xzonedb();
var nsupdate = new xnsupdate();
function recDel($opts) {
	this.log = 0;
}
module.exports = recDel;

var $zoneDir = '/var/bind';
self.del = function($name) {
	let $fwd = $name;
	//let $rev = $name;
	//($addr.match(/[^\.]+/g).reverse().join('.') + '.in-addr.arpa')
	if($name) {
		let $db = $zonedb.load();
		async.series([
			function($cb) {
				if($db) {
					nsupdate.del($name, $cb);
				} else {
					console.log('-- record: [' + $name + '] does not exist!');
				}
			}
		]);
	}
}

// shell
var args = process.argv;
if(args[1].match(/rec-del(?:\.js)?$/g)) {
	var client = new recDel();
	console.log('key: ' + args[2] + ' value: ' + args[3]);
	async.series([
		function($cb) {
			client.del(args[2]);
			setTimeout(function() {
				$cb(null);
			}, 100);
		},
		function($cb) {
			$zonedb.refresh($cb);
		}
	]);
}
