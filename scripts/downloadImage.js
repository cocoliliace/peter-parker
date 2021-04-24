const fs = require("fs");
const https = require("https");

module.exports = downloadImage;

function downloadImage(imageUrl, folderName, page) {
	return new Promise((resolve, reject) => {
		const client = https.request(imageUrl, response => {
			if (response.statusCode === 200 || response.statusCode === 204) {
				let data = [];

				response.on("data", chunk => data.push(chunk));
				response.once("end", () => resolve(fs.writeFileSync(`./${ folderName }/${ page }.jpg`, Buffer.concat(data))));
				response.once("error", error => reject(`Error: ${ error.message }`));
			} else if (response.statusCode === 503) {
				resolve(downloadImage(imageUrl, folderName, page));
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		});

		client.end();
		client.once("error", reject);
	});
}