const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");

module.exports = async url => {
	const $ = await getPage(url).catch(error => { throw error; });
	const folderName = $("#gn").text().replace(/^\(.{1,15}\) /, "").replace(/\.?( (\[|\{|\().{1,20}(\]|\}|\)))+$/, "");

	if (!fs.existsSync(`./${ folderName }`)) {
		fs.mkdirSync(`./${ folderName }`);
	}

	const previewPages = $("table.ptt tr").children().length - 2;
	url = url.replace(/\/$/, "");

	let promises = [];
	let chunkPromises = [];
	for (let previewPage = 0; previewPage < previewPages; previewPage++) {
		chunkPromises.push(downloadChunk(url, previewPage, folderName, promises));
	}

	await Promise.allSettled(chunkPromises);
	displayProgress(promises);
	await Promise.allSettled(promises);
	makePdf(folderName);
};

async function downloadChunk(url, previewPage, folderName, promises) {
	const $ = await getPage(`${ url }/?p=${ previewPage }`).catch(error => { throw error; });

	const imageUrls = $("#gdt a");

	let pagePromises = [];
	for (const key in imageUrls) {
		if (imageUrls[key].attribs?.href) {
			pagePromises.push(downloadPage(imageUrls[key].attribs.href, folderName, previewPage * 40 + parseInt(key) + 1, promises));
		}
	}
	await Promise.allSettled(pagePromises);
}

async function downloadPage(url, folderName, page, promises) {
	const $ = await getPage(url).catch(error => { throw error; });

	const imageUrl = $("#img").attr("src");
	promises.push(downloadImage(imageUrl, `./${ folderName }/${ page }`));
}