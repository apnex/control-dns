#!/usr/bin/env node
var fs = require('fs');

// constructor
var self = xfile.prototype;
function xfile($opts) {
        this.log = 0;
}
module.exports = xfile;

// main
self.read = ($file, $cb) => {
	fs.readFile($file, 'utf8', (err, data) => {
		if($cb) {
			//setTimeout(function() {
				//console.log('waiting');
				$cb(null, data);
			//}, 1000);
		}
	});
};
self.write = ($file, $string, $cb) => {
	fs.writeFile($file, $string, 'utf8', (err) => {
		if($cb) {
			//setTimeout(function() {
				//console.log('waiting');
				$cb(null, $file);
			//}, 1000);
		}
	});
};
