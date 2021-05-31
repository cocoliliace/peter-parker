const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImageBuffer.js");

module.exports = async url => {
	const [fileName, lastPage] = await getInfo(url);

	const promises = downloadChapter(url.match(/g\/(\d+)/)[1], lastPage);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });

	const fileName = $("#info h1").text();
	const lastPage = parseInt($("#info").children().eq(-3).text());

	return [fileName, lastPage];
}

function downloadChapter(number, lastPage) {
	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		promises.push(downloadImage(`https://cdn.9hentai.ru/images/${ number }/${ page }.jpg`).catch(console.log));
	}

	return promises;
}
