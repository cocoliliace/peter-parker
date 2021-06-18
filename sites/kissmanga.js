const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");
const folderPath = require("../config.json").folderPath.replace(/\/$/, "");

module.exports = async url => {
	const [title, chapters] = await getInfo(url);

	if (!fs.existsSync(`${ folderPath }/${ title }`)) {
		fs.mkdirSync(`${ folderPath }/${ title }`);
	}

	let chapterPromises = [];
	let imagePromises = [];
	let pdfPromises = [];

	for (const key in chapters) {
		if (chapters[key].attribs?.href) {
			const chapterName = chapters[key].attribs.href.match(/chapter_\d+(.\d)?$/)[0];
			const chapterUrl = `https://kissmanga.org${ chapters[key].attribs.href }`;
			chapterPromises.push(downloadChapter(chapterUrl, `${ title }/${ chapterName }`, imagePromises, pdfPromises));
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

async function downloadChapter(url, filePath, imagePromises, pdfPromises) {
	const $ = await getPage(url).catch(error => { throw error; });
	const pages = $("#centerDivVideo");
	const pageCount = pages.children().length;

	let promises = [];
	for (let page = 1; page < pageCount; page++) {
		const promise = downloadImage(pages.children().eq(page - 1).attr("src")).catch(console.log);
		promises.push(promise);
		imagePromises.push(promise);
	}
	pdfPromises.push(makePdf(promises, filePath, url));
}
