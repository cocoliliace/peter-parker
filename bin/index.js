#!/usr/bin/env node

const Conf = require("conf");
const config = new Conf({
	schema: {
		outputDirectory: {
			type: "string",
			default: ""
		},
		executablePath: {
			type: "string",
			default: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
		}
	}
});

if (!process.argv[2]) {
	require("../src/util/deserialize.js")(config.get("outputDirectory"));
	return console.log("No sauce given!");
}

if (process.argv[2] === "config") return require("./config.js")(config, process.argv[3]);

const startTime = process.hrtime();
require("../src/sauce.js")(process.argv[2], config).then(fileName => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved "${ config.get("outputDirectory") }/${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
	console.log("Courtesy, your friendly neighbourhood Spider-Man");
}).catch(error => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(error);
});
