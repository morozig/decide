#!/usr/bin/env node
var decide = require("./decide.js");

if (process.argv.length != 4){
    console.log('Usage:\n  decide parameter1 parameter2');
	return;
} else {
    decide(process.argv[2], process.argv[3]);
}