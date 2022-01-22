const https = require("https");
const readline = require("readline");
const cheerio = require("cheerio");

module.exports = url => {
	return new Promise((resolve, reject) => {
		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		process.stdout.write("Fetching page...");
		const client = https.request(url, {
			method: "GET",
		}, response => {
			if (response.statusCode === 200 || response.statusCode === 204) {
				let chunks = [];

				response.on("data", chunk => chunks.push(chunk));
				response.once("end", () => resolve(cheerio.load(Buffer.concat(chunks))));
				response.once("error", error => reject(`Error: ${ error.message }`));
			} else if (response.statusCode === 404) {
				reject("Sauce not found!");
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		});

		client.end();
		client.once("error", () => reject("Sauce not found!"));
	});
};
