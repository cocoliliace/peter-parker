#!/usr/bin/env node

let config = require("../config.json");

if (process.argv[2] === "config") return require("./config.js")(config, process.argv[3]);

config.outputDirectory = config.outputDirectory || process.cwd();

if (!process.argv[2]) {
	require("../src/util/deserialize.js")(config.outputDirectory);
	return console.log("No sauce given!");
}

const startTime = process.hrtime();
require("../src/sauce.js")(process.argv[2], config).then(fileName => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved "${ config.outputDirectory }/${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
	console.log("Courtesy, your friendly neighbourhood Spider-Man");
}).catch(error => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(error);
	if (error.startsWith("The output directory")) process.exit(1);
});
