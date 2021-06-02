const https = require("https");
const UserAgent = require("user-agents");
const cheerio = require("cheerio");

module.exports = url => {
	return new Promise((resolve, reject) => {
		const client = https.request(url, {
			method: "GET",
			headers: {
				"User-Agent": new UserAgent({ deviceCategory: "desktop" }).toString()
			}
		}, response => {
			if (response.statusCode === 200 || response.statusCode === 204) {
				let chunks = [];

				response.on("data", chunk => chunks.push(chunk));
				response.once("end", () => resolve(cheerio.load(Buffer.concat(chunks).toString())));
				response.once("error", error => reject(`Error: ${ error.message }`));
			} else if (response.statusCode === 404) {
				reject("Sauce not found!");
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		});

		client.end();
		client.once("error", reject);
	});
};
