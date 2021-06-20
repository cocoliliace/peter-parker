const getPage = require("../util/getPage");
const downloadImage = require("../util/downloadImage.js");

module.exports = async url => {
	url = url.replace(/\/$/, "");
	const [fileName, previewPages] = await getInfo(url);

	const promises = await downloadChunks(url, previewPages);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	const fileName = $("#gn").text();
	const previewPages = $("table.ptt tr").children().length - 2;

	return [fileName, previewPages];
}

async function downloadChunks(url, previewPages) {
	let promises = [];
	let chunkPromises = [];

	for (let previewPage = 0; previewPage < previewPages; previewPage++) {
		chunkPromises.push(getPage(`${ url }/?p=${ previewPage }`).catch(error => { throw error; }));
	}

	await Promise.all(chunkPromises).then(results => {
		results.forEach($ => downloadChunk($("#gdt a"), promises));
	});

	return promises;
}

function downloadChunk(imageUrls, promises) {
	for (const key in imageUrls) {
		if (imageUrls[key].attribs?.href) {
			downloadPage(imageUrls[key].attribs.href, promises);
		}
	}
}

function downloadPage(url, promises) {
	promises.push(
		Promise.resolve(getPage(url))
			.then($ => downloadImage($("#img").attr("src")).catch(console.log))
			.catch(error => { throw error; })
	);
}
