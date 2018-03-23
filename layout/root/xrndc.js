#!/usr/bin/env node
const execSync = require('child_process').execSync;
var args = process.argv.slice(2);
var hd = require('heredoc');

// constructor
var self = xrndc.prototype;
function xrndc($opts) {
	this.log = 0;
}
module.exports = xrndc;

self.add = function($zone, $file, $cb) {
	if($zone && $file) {
	        var $spec = hd.strip(function () {/*
			rndc addzone "<zone>" '{ type master; file "<file>"; update-policy local; };'*/}
		);
		$spec = $spec.replace(/<zone>/g, $zone);
		$spec = $spec.replace(/<file>/g, $file);
		self.cmd($spec, $cb);
	}
};
self.del = function($zone, $cb) {
	if($zone) {
		var $spec = hd.strip(function () {/*
			rndc sync -clean
			rndc delzone -clean <zone>*/}
		);
		$spec = $spec.replace(/<zone>/g, $zone);
		self.cmd($spec, $cb);
	}
};
self.dump = function($cb) {
	var $spec = hd.strip(function () {/*
		rndc dumpdb -zones*/}
	);
	self.cmd($spec, $cb);
};
self.cmd = function($cmd, $cb) {
	try {
		console.log($cmd)
        	execSync($cmd);
		setTimeout(function() {
			if($cb) {
				$cb(null);
			}
		}, 100);
	} catch(ex) {
		if(ex.stdout.toString().length > 0) {
			console.log(ex.stdout.toString());
			if($cb) {
				$cb(null);
			}
		}
	}
};
