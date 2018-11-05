#!/usr/bin/env node
const execSync = require('child_process').execSync;
var hd = require('heredoc');

// constructor
var args = process.argv.slice(2);
var self = xnsupdate.prototype;
function xnsupdate($opts) {
        this.log = 0;
}
module.exports = xnsupdate;

self.add = function($entry, $cb) {
	let $spec = hd.strip(function () {/*
		nsupdate -l -v <<-NSEOF
		update add <name> <ttl> <type> <value>
		send
		NSEOF*/}
	);
	$spec = $spec.replace(/<name>/g, $entry.name);
	$spec = $spec.replace(/<ttl>/g, $entry.ttl);
	$spec = $spec.replace(/<type>/g, $entry.type);
	$spec = $spec.replace(/<value>/g, $entry.value);
	self.cmd($spec, $cb);
};
self.del = function($entry, $cb) {
	let $spec = hd.strip(function () {/*
		nsupdate -l -v <<-NSEOF
		update delete <name>
		send
		NSEOF*/}
	);
	console.log($spec);
	$spec = $spec.replace(/<name>/g, $entry);
	self.cmd($spec, $cb);
};
self.cmd = ($cmd, $cb) => {
        try {
		//console.log($cmd)
             	execSync($cmd);
		setTimeout(function() {
			$cb(null);
		}, 100);
        } catch (ex) {
                if(ex.stdout.toString().length > 0) {
                        console.log(ex.stdout.toString());
			$cb(null);
                }
        }
};
