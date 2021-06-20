#!/usr/bin/env node

if (!process.argv[2]) {
	require("../src/util/deserialize.js")();
	return console.log("No sauce given!");
}

const Conf = require("conf");
const config = new Conf({
	schema: {
		outputPathFolder: {
			type: "string"
		},
		executablePath: {
			type: "string",
			default: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
		}
	}
});

if (process.argv[2] === "config") return require("./config.js")(config, process.argv[3]);

require("./sauce.js")(process.argv[2], config);
