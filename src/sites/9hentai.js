const getPage = require("../util/getPage");
const downloadImage = require("../util/downloadImage.js");

module.exports = async url => {
	const [fileName, pageCount] = await getInfo(url);

	const promises = downloadChapter(url.match(/g\/(\d+)/)[1], pageCount);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });

	const fileName = $("#info h1").text();
	const pageCount = parseInt($("#info").children().eq(-3).text());

	return [fileName, pageCount];
}

function downloadChapter(number, pageCount) {
	let promises = [];
	for (let page = 1; page <= pageCount; page++) {
		promises.push(downloadImage(`https://cdn.9hentai.ru/images/${ number }/${ page }.jpg`).catch(console.log));
	}

	return promises;
}
