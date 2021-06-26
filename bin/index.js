#!/usr/bin/env node
let config = require("../config.json");

if (require.main === module) cli(process.argv);

module.exports = cli;

async function cli(args) {
	if (args[2] === "config") return await require("./config.js")(config, args[3]);

	config.outputDirectory = config.outputDirectory || process.cwd();

	if (!args[2]) {
		await require("../src/util/deserialize.js")(config.outputDirectory);
		return console.log("No sauce given!");
	}

	require("fs").access(config.outputDirectory, 2, error => {
		if (error?.code === "ENOENT") return console.log("The output directory doesn't exist");
		else if (error) return console.log("The output directory is read-only");
	});

	const readline = require("readline");
	const startTime = process.hrtime();
	await require("../src/sauce.js")(args[2], config).then(fileName => {
		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		console.log(`Saved "${ config.outputDirectory }/${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
		console.log("Courtesy, your friendly neighbourhood Spider-Man");
	}).catch(error => {
		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		console.log(error);
	});
}
