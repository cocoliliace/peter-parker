const fs = require("fs");
const getPage = require("../scripts/getPage");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");
const makePdf = require("../scripts/makePdf.js");

module.exports = async number => {
	const $ = await getPage(`https://nhentai.net/g/${ number }/`).catch(error => { throw error });

	const [lastPage, folderName] = getInfo($);

	const promises = downloadChapter($, lastPage, folderName);

	displayProgress(promises);

	await Promise.allSettled(promises);
	return makePdf(folderName);
};

function getInfo($) {
	const lastPage = $("#tags").children().eq(-2).children().text();
	const artistField = $("#info > h1.title > span.before").text().match(/\[.+\]/);
	let artistTag;
	if (!artistField) {
		artistTag = $("#tags").children().eq(3).children().eq(0).children().eq(0).children().eq(0).text()
			.split(" ").map(word => `${ word.substring(0,1).toUpperCase() }${ word.substring(1) }`).join(" ");
	}
	const artist = artistField ? `${ artistField[0] } ` : artistTag ? `[${ artistTag }] ` : "";
	const title = $("#info > h1.title > span.pretty").text();
	const folderName = `${ artist }${ title }`;

	return [lastPage, folderName];
}

function downloadChapter($, lastPage, folderName) {
	if (!fs.existsSync(`./${ folderName }`)) {
		fs.mkdirSync(`./${ folderName }`);
	}

	let promises = [];
	for (let page = 1; page <= lastPage; page++) {
		const imageUrl = $(".thumbs").children().eq(page - 1).children().eq(0).children().eq(0).attr("data-src").replace("t.", "i.").replace("t.", ".");
		promises.push(downloadImage(imageUrl, folderName, page));
	}
	return promises;
}