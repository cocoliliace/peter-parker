const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");
const webp = require("webp-converter");
webp.grant_permission();

module.exports = async url => {
	const [baseUrl, lastPage, folderName] = await getInfo(url);

	const promises = await downloadChapter(baseUrl, lastPage, folderName);

	displayProgress(promises);

	await Promise.allSettled(promises);
	makePdf(folderName);
};

async function getInfo(url) {
	const $ = await getPage(url.replace(/\/$/, "")).catch(error => { throw error; });

	const script = $("main .container").children()[1].children[0].data;
	const baseUrl = `https://hentaimimi.com//${ script.match(/"([^"]*)"/)[1].slice(0, -8) }`;

	const fields = $("div.p-0").children();
	const lastPage = parseInt(fields.eq(5).children().eq(1).text());
	const title = fields.eq(0).text();
	const artist = fields.eq(1).children().eq(1).text()
		.split(" ").map(word => `${ word.substring(0,1).toUpperCase() }${ word.substring(1) }`).join(" ");
	const folderName = `[${ artist }] ${ title }`;

	return [baseUrl, lastPage, folderName];
}

async function downloadChapter(baseUrl, lastPage, folderName) {
	if (!fs.existsSync(`./${ folderName }`)) {
		fs.mkdirSync(`./${ folderName }`);
	}

	let webpPromises = [];
	let promises = [];

	for (let page = 1; page <= lastPage; page++) {
		webpPromises.push(downloadImage(`${ baseUrl }${ "0".repeat(3 - page.toString().length) }${ page }.webp`, `./${ folderName }/${ page }.webp`)
			.then(filePath => promises.push(webpToJpg(filePath))).catch(console.log));
	}

	await Promise.allSettled(webpPromises);
	return promises;
}

async function webpToJpg(filePath) {
	await webp.dwebp(filePath, filePath.replace(".webp", ""), "-o");
	fs.unlinkSync(filePath);
}