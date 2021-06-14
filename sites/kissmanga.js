const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");

module.exports = async url => {
	const [title, chapters] = await getInfo(url);

	if (!fs.existsSync(`./${ title }`)) {
		fs.mkdirSync(`./${ title }`);
	}

	let chapterPromises = [];
	let imagePromises = [];
	let pdfPromises = [];

	for (const key in chapters) {
		if (chapters[key].attribs?.href) {
			const chapterName = chapters[key].attribs.href.match(/chapter_\d+(.\d)?$/)[0];
			const chapterUrl = `https://kissmanga.org${ chapters[key].attribs.href }`;
			chapterPromises.push(downloadChapter(chapterUrl, title, chapterName, imagePromises, pdfPromises));
		}
	}
	await Promise.allSettled(chapterPromises);
	displayProgress(imagePromises);
	await Promise.allSettled(imagePromises);
	Promise.allSettled(pdfPromises).then(() => fs.rmdirSync(`./${ title }`));
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });
	const title = $(".bigChar").text();
	if (!title) throw "Sauce not found!";
	const chapters = $(".listing a");

	return [title, chapters];
}

async function downloadChapter(url, title, chapterName, imagePromises, pdfPromises) {
	const $ = await getPage(url).catch(error => { throw error; });
	const pages = $("#centerDivVideo");
	const pageCount = pages.children().length;

	if (!fs.existsSync(`./${ title }/${ chapterName }`)) {
		fs.mkdirSync(`./${ title }/${ chapterName }`);
	}

	let promises = [];
	for (let page = 1; page < pageCount; page++) {
		const promise = downloadImage(pages.children().eq(page - 1).attr("src"), `./${ title }/${ chapterName }/${ page }`).catch(console.log);
		promises.push(promise);
		imagePromises.push(promise);
	}
	Promise.allSettled(promises).then(() => pdfPromises.push(makePdf(chapterName, title)));
}
