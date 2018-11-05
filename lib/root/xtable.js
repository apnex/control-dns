#!/usr/bin/env node
var args = process.argv;
var self = xtable.prototype;

// constructor
function xtable($opts) {
	this.cache = {};
}
module.exports = xtable;

self.out = function($data, $cols) {
	if($data) {
		if(!$cols) {
			// learn cols from first record
			var $cols = [];
			for(let $item in $data[0]) {
				$cols.push($item);
			}
		}

		var $col = {};
		for(let $item of $cols) {
			$col[$item] = $item;
		}
		this.runColWidth($col);

		// scan widths data
		for(let $item of $data) {
			this.runColWidth($item);
		}

		// build string header
		let $head = "";
		let $dash = "";
		for(let $item of $cols) {
			$head += $item + " ".repeat(this.cache[$item] - $item.length + 2); // remove 2 space at end?
			$dash += "-".repeat(this.cache[$item]) + "  ";
		}
			console.log($head);
		console.log($dash);

		// build string data
		for(let $item of $data) {
			let $str = "";
				for(let $col of $cols) {
				$str += $item[$col] + " ".repeat(this.cache[$col] - $item[$col].length + 2);
			}
			console.log($str);
		}
	}
}

self.runColWidth = function($item) {
	for(let $key in $item) {
		if(!this.cache[$key] || this.cache[$key] < $item[$key].length) {
			this.cache[$key] = $item[$key].length;
		}
        }
}

// xtable.js called from shell
if(args[1].match(/xtable.js$/g)) {
	var client = new xtable();
	client.out([JSON.parse(args[2])]);
}
