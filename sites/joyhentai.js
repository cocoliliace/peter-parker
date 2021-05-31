const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImageBuffer.js");

module.exports = async url => {
	const [baseUrl, fileExtension, fileName, lastPage] = await getInfo(url);

	const promises = downloadChapter(baseUrl, fileExtension, lastPage);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	const fileName = $("h1.list-pickup-header").text();
	if (!fileName) throw "Sauce not found!";
	const lastPage = parseInt($("a[title='Total Pages']").text());
	const firstUrl = $("div.col.s12.m12.l12.center img").attr("data-src");
	const baseUrl = firstUrl.replace(/\/1\..+$/, "/");
	const fileExtension = firstUrl.match(/\/1\.(.+)$/)[1];

	return [baseUrl, fileExtension, fileName, lastPage];
}

function downloadChapter(baseUrl, fileExtension, lastPage) {
	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		promises.push(downloadImage(`${ baseUrl }${ page }.${ fileExtension }`).catch(console.log));
	}

	return promises;
}
