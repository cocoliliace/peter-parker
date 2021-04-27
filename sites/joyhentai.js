const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");

module.exports = async url => {
	const $ = await getPage(url.startsWith("https") ? url : `https://joyhentai.com/detail/${ url }.html`).catch(error => { throw error });

	const [baseUrl, folderName, lastPage] = getInfo($, url);

	if (!fs.existsSync(`./${ folderName }`)) {
		fs.mkdirSync(`./${ folderName }`);
	}

	const promises = downloadChapter(baseUrl, folderName, lastPage);

	displayProgress(promises);

	await Promise.allSettled(promises);
	return makePdf(folderName);
};

function getInfo($) {
	const folderName = $("h1.list-pickup-header").text().replace(/\.?( \[.+\])+$/, "");
	if (!folderName) throw "Sauce not found!";
	const lastPage = parseInt($("a[title='Total Pages']").text());
	const baseUrl = $("div.col.s12.m12.l12.center img").attr("data-src").replace(/\/1\..+$/, "/");

	return [baseUrl, folderName, lastPage];
}

function downloadChapter(baseUrl, folderName, lastPage) {
	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		promises.push(downloadImage(`${ baseUrl }${ page }.jpg`, folderName, page));
	}
	return promises;
}