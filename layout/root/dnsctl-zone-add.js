#!/usr/bin/env node
const execSync = require('child_process').execSync;
var async = require('async');
var hd = require('heredoc');
var xrndc = require('./xrndc.js');
var xfile = require('./xfile.js');
var xzone = require('./xzone.js');
var xzonedb = require('./xzonedb');

// constructor
var args = process.argv.slice(2);
var self = zoneAdd.prototype;
var $rndc = new xrndc();
var $file = new xfile();
let $bone = new xzone();
let $zonedb = new xzonedb();
function zoneAdd($opts) {
        this.cache = {};
}
module.exports = zoneAdd;

// main
//var $zoneDir = './';
var $zoneDir = '/var/bind/';
self.addZone = function($zone, $subnet) {
	if($zone && $subnet) {
		async.series([
			function($cb) {
				$zonedb.refresh($cb);
			},
			function($cb) {
				let $result = $zonedb.load();
				if($result && $result[$zone]) {
					console.log('-- zone: [' + $zone + '] already exists!');
				} else {
					console.log('-- zone: [' + $zone + '] does not exist!');
					self.buildZone($zone, $subnet);
				}
				$cb(null);
			}
		]);
	}
};
self.buildZone = function($zone, $subnet) {
	var $zoneBase = hd.strip(function () {/*
		$TTL 86400
		@ IN SOA ns1.<zone>. mail.<zone>. (
			100	; Serial
			3600	; Refresh
			1800	; Retry
			604800	; Expire
			86400	; Minimum TTL
		)
				IN	NS	ns1.<zone>.
	*/});
	var $zoneFwd = hd.strip(function () {/*
		ns1		IN	A	<addr>
	*/});
	var $zoneRev = hd.strip(function () {/*
		<host>		IN	PTR	ns1.<zone>.
	*/});
	let $myAddr = findIp('8.8.8.8'); // route lookup for eth0 IP
	//let $myAddr = findIp('172.17.1.1'); // route lookup for eth0 IP
	$zoneBase = $zoneBase.replace(/<zone>/g, $zone);
	$zoneFwd = $zoneFwd.replace(/<addr>/g, $myAddr);
	$zoneRev = $zoneRev.replace(/<host>/g, $myAddr.match(/[^\.]+/g)[3]);
	$zoneRev = $zoneRev.replace(/<zone>/g, $zone);

	let $fileRev = $zoneDir + $zone + '.zone.rev';
	let $fileFwd = $zoneDir + $zone + '.zone.fwd';
	async.series([
		function($cb) {
			let $fwd = $zoneBase + $zoneFwd;
			write($fileFwd, $fwd);
			let $rev = $zoneBase + $zoneRev;
			write($fileRev, $rev, $cb);
		},
		function($cb) {
			$rndc.add($zone, $zoneDir + $zone + '.zone.fwd');
			let $ptr = $subnet.match(/[^\.]+/g).splice(0,3).reverse().join('.');
			let $arpa = $ptr + '.in-addr.arpa';
			$rndc.add($arpa, $zoneDir + $zone + '.zone.rev', $cb);
		},
		function($cb) {
			$zonedb.refresh($cb);
			console.log('-- rndc db extraction completed --');
		}
	]);
};
var write = async function($name, $string, $cb) {
	console.log('-- zone: [' + $name + '] - creating...');
	console.log($string);
	await $file.write($name, $string);
	console.log('-- zone: [' + $name + '] - was created!');
	if($cb) {
		setTimeout(function() {
			$cb(null);
		}, 100);
	}
};
var findIp = function($addr) {
	let $str = 'ip route get ' + $addr;
	let $srcIp = 0;
	try {
		let $response = execSync($str).toString();
		$srcIp = $response.match(/src.([0-9\.]+)/)[1];
	} catch (ex) {
		console.log(ex.stdout.toString());
	}
	return $srcIp;
};

self.addZone(args[0], args[1]);
