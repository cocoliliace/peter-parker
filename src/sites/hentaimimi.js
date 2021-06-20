const sharp = require("sharp");
const getPage = require("../util/getPage");
const downloadImage = require("../util/downloadImage.js");

module.exports = async url => {
	const [baseUrl, pageCount, fileName] = await getInfo(url);

	const promises = await downloadChapter(baseUrl, pageCount, fileName);

	return [promises, fileName, url];
};

async function getInfo(url) {
	const $ = await getPage(url.replace(/\/$/, "")).catch(error => { throw error; });

	const script = $("main .container").children()[1].children[0].data;
	const baseUrl = `https://hentaimimi.com//${ script.match(/"([^"]*)"/)[1].slice(0, -8) }`;

	const fields = $("div.p-0").children();
	const pageCount = parseInt(fields.eq(5).children().eq(1).text());
	const title = fields.eq(0).text();
	const artist = fields.eq(1).children().eq(1).text()
		.split(" ").map(word => `${ word.substring(0,1).toUpperCase() }${ word.substring(1) }`).join(" ");
	const fileName = `[${ artist }] ${ title }`;

	return [baseUrl, pageCount, fileName];
}

function downloadChapter(baseUrl, pageCount) {
	let promises = [];

	for (let page = 1; page <= pageCount; page++) {
		promises.push(downloadImage(`${ baseUrl }${ "0".repeat(3 - page.toString().length) }${ page }.webp`).then(webpBuffer => sharp(webpBuffer).jpeg(100).toBuffer()).catch(console.log));
	}

	return promises;
}
