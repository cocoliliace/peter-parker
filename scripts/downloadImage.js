const fs = require("fs");
const https = require("https");

module.exports = downloadImage;

function downloadImage(imageUrl, filePath) {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(filePath)) resolve();
		const client = https.request(imageUrl, response => {
			if (response.statusCode === 200 || response.statusCode === 204) {
				let data = [];

				response.on("data", chunk => data.push(chunk));
				response.once("end", () => resolve(fs.writeFileSync(filePath, Buffer.concat(data))));
				response.once("error", error => reject(`Error: ${ error.message }`));
			} else if (response.statusCode === 503) {
				resolve(downloadImage(imageUrl, filePath));
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		});

		client.end();
		client.once("error", reject);
	});
}