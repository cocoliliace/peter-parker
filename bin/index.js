#!/usr/bin/env node

let config = require("../config.json");

if (process.argv[2] === "config") return require("./config.js")(config, process.argv[3]);

config.outputDirectory = config.outputDirectory || process.cwd();

if (!process.argv[2]) {
	require("../src/util/deserialize.js")(config.outputDirectory);
	return console.log("No sauce given!");
}

require("fs").access(config.outputDirectory, 2, error => {
	if (error?.code === "ENOENT") return console.log("The output directory doesn't exist");
	else if (error) return console.log("The output directory is read-only");
});

const readline = require("readline");
const startTime = process.hrtime();
require("../src/sauce.js")(process.argv[2], config).then(fileName => {
	readline.clearLine(process.stdout, 0);
	readline.cursorTo(process.stdout, 0);
	console.log(`Saved "${ config.outputDirectory }/${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
	console.log("Courtesy, your friendly neighbourhood Spider-Man");
}).catch(error => {
	readline.clearLine(process.stdout, 0);
	readline.cursorTo(process.stdout, 0);
	console.log(error);
});
