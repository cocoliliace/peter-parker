#!/usr/bin/env node
const readline = require("readline");
const handleArgs = require("./config.js");
const config = require("../config.json");

if (require.main === module) cli(process.argv);

module.exports = cli;

async function cli(args) {
	if (await handleArgs(config, args)) return;

	if (!args[2]) {
		await require("../src/util/deserialize.js")(config.outputDirectory);
		return console.log("No sauce given!");
	}

  require("fs").access(config.outputDirectory, 2, error => {
    if (error?.code === "ENOENT") {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log("The output directory doesn't exist");
      process.exit(1);
    } else if (error) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log("The output directory is read-only");
      process.exit(1);
    }
  });

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
		if (error === "Some pages failed to download") console.log("Run \"sauce\" again without any arguments when your internet is stable again to continue the download");
	});
}
