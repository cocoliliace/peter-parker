const getPage = require("../util/getPage");
const downloadImage = require("../util/downloadImage.js");

module.exports = async sauce => {
	const url = isNaN(sauce) ? `${ sauce }/`.replace(/\/\/$/, "/") : `https://nhentai.net/g/${ sauce }/`;

	const [pages, pageCount, fileName] = await getInfo(url);

	const promises = downloadChapter(pages, pageCount);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url).catch(error => { throw error; });

	const pages = $(".thumbs").children();

	const tags = $("#tags").children();
	const pageCount = tags.eq(-2).children().text();

	const artistField = $("#info h1.title span.before").text().match(/\[.+\]/);
	let artistTag;
	if (!artistField) {
		artistTag = tags.eq(3).children().eq(0).children().eq(0).children().eq(0).text()
			.split(" ").map(word => `${ word.substring(0,1).toUpperCase() }${ word.substring(1) }`).join(" ");
	}
	const artist = artistField ? `${ artistField[0] } ` : artistTag ? `[${ artistTag }] ` : "";
	const title = $("#info h1.title span.pretty").text().replace(/^\[.{1,16}\] /, "");
	const fileName = artist + title;

	return [pages, pageCount, fileName];
}

function downloadChapter(pages, pageCount) {
	let promises = [];
	for (let page = 0; page < pageCount; page++) {
		const imageUrl = pages.eq(page).children().eq(0).children().eq(0).attr("data-src").replace("t.", "i.").replace("t.", ".");
		promises.push(downloadImage(imageUrl).catch(console.log));
	}

	return promises;
}
