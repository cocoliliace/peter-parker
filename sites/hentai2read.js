const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");

module.exports = async url => {
	const [baseUrl, folderName, lastPage] = await getInfo(url);

	const promises = downloadChapter(baseUrl, folderName, lastPage);

	displayProgress(promises);

	await Promise.allSettled(promises);
	await makePdf(folderName);
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });

	const baseUrl = await getBaseUrl($("#js-linkNext").attr("href"));

	const title = $("h3.block-title a").text().trim().replace(/ \[.+\]/, "");
	const artist = $("ul.list.list-simple-mini").children().eq(9).children().eq(1).text();
	const folderName = `[${ artist }] ${ title }`;

	const lastPage = parseInt($("ul.list.list-simple-mini").children().eq(7).children().eq(1).text());

	return [baseUrl, folderName, lastPage];
}

async function getBaseUrl(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	return $("#arf-reader").attr("src").replace(/0001\..+$/, "");
}

function downloadChapter(baseUrl, folderName, lastPage) {
	if (!fs.existsSync(`./${ folderName }`)) {
		fs.mkdirSync(`./${ folderName }`);
	}

	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		promises.push(downloadImage(`${ baseUrl }${ "0".repeat(4 - page.toString().length) }${ page }.jpg`, `./${ folderName }/${ page }`).catch(console.log));
	}

	return promises;
}