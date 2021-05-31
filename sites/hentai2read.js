const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImageBuffer.js");

module.exports = async url => {
	const [baseUrl, fileName, lastPage] = await getInfo(url);

	const promises = downloadChapter(baseUrl, fileName, lastPage);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });

	const baseUrl = await getBaseUrl($("#js-linkNext").attr("href"));

	const title = $("h3.block-title a").text().trim().replace(/ \[.+\]/, "");
	const artist = $("ul.list.list-simple-mini").children().eq(9).children().eq(1).text();
	const fileName = `[${ artist }] ${ title }`;

	const lastPage = parseInt($("ul.list.list-simple-mini").children().eq(7).children().eq(1).text());

	return [baseUrl, fileName, lastPage];
}

async function getBaseUrl(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	return $("#arf-reader").attr("src").replace(/0001\..+$/, "");
}

function downloadChapter(baseUrl, folderName, lastPage) {
	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		promises.push(downloadImage(`${ baseUrl }${ "0".repeat(4 - page.toString().length) }${ page }.jpg`, `./${ folderName }/${ page }`).catch(console.log));
	}

	return promises;
}
