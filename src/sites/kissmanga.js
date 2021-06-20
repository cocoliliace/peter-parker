const fs = require("fs");
const getPage = require("../util/getPage");
const downloadImage = require("../util/downloadImage.js");
const displayProgress = require("../util/displayProgress.js");
const makePdf = require("../util/makePdf.js");

module.exports = async (url, outputFolderPath) => {
	const [title, chapters] = await getInfo(url);

	if (!fs.existsSync(`${ outputFolderPath }/${ title }`)) {
		fs.mkdirSync(`${ outputFolderPath }/${ title }`);
	}

	let chapterPromises = [];
	let imagePromises = [];
	let pdfPromises = [];

	for (const key in chapters) {
		if (chapters[key].attribs?.href) {
			const chapterName = chapters[key].attribs.href.match(/chapter_\d+(.\d)?$/)[0];
			const chapterUrl = `https://kissmanga.org${ chapters[key].attribs.href }`;
			chapterPromises.push(downloadChapter(chapterUrl, chapterName, outputFolderPath, imagePromises, pdfPromises));
		}
	}

	await Promise.allSettled(chapterPromises);
	displayProgress(imagePromises);
	await Promise.allSettled(pdfPromises);
	return [null, title, null];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	const title = $(".bigChar").text();
	if (!title) throw "Sauce not found!";
	const chapters = $(".listing a");

	return [title, chapters];
}

async function downloadChapter(url, fileName, outputFolderPath, imagePromises, pdfPromises) {
	const $ = await getPage(url).catch(error => { throw error; });
	const pages = $("#centerDivVideo");
	const pageCount = pages.children().length;

	let promises = [];
	for (let page = 1; page < pageCount; page++) {
		const promise = downloadImage(pages.children().eq(page - 1).attr("src")).catch(console.log);
		promises.push(promise);
		imagePromises.push(promise);
	}
	pdfPromises.push(makePdf(promises, fileName, outputFolderPath, url));
}
