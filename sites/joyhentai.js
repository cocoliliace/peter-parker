const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImageBuffer.js");

module.exports = async url => {
	const [baseUrl, fileExtension, fileName, pageCount] = await getInfo(url);

	const promises = downloadChapter(baseUrl, fileExtension, pageCount);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	const fileName = $("h1.list-pickup-header").text();
	if (!fileName) throw "Sauce not found!";
	const pageCount = parseInt($("a[title='Total Pages']").text());
	const firstUrl = $("div.col.s12.m12.l12.center img").attr("data-src");
	const baseUrl = firstUrl.replace(/\/1\..+$/, "/");
	const fileExtension = firstUrl.match(/\/1\.(.+)$/)[1];

	return [baseUrl, fileExtension, fileName, pageCount];
}

function downloadChapter(baseUrl, fileExtension, pageCount) {
	let promises = [];
	for (let page = 1; page <= pageCount; page++) {
		promises.push(downloadImage(`${ baseUrl }${ page }.${ fileExtension }`).catch(console.log));
	}

	return promises;
}
