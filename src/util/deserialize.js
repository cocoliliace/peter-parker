const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const serialize = require("./serialize.js");
const downloadImage = require("./downloadImage.js");

module.exports = async outputDirectory => {
	if (!fs.existsSync(`${ outputDirectory }/temp`)) return;

	const doc = await PDFDocument.load(fs.readFileSync(`${ outputDirectory }/temp.pdf`), { updateMetadata: false });
	const lines = fs.readFileSync(`${ outputDirectory }/temp`).toString().trim().split("\n");

	let rejectedUrls = "";
	let promises = [];
	for (let i = 0; i < lines.length; i++) {
		const [page, url] = lines[i].split(" ");
		promises.push(downloadImage(url).then(buffer => updatePage(doc, buffer, parseInt(page) - 1))
			.catch(() => rejectedUrls += lines[i] + "\n"));
	}

	await Promise.allSettled(promises);
	await serialize(rejectedUrls, getFileName(doc), outputDirectory, doc);
	process.exit(0);
};

async function updatePage(doc, buffer, page) {
	const image = await doc.embedJpg(buffer).catch(async () => await doc.embedPng(buffer).catch(error => { throw error; }));
	doc.removePage(page);
	doc.insertPage(page, [image.width, image.height]).drawImage(image);
}

function getFileName(doc) {
	const title = doc.getTitle();
	const author = doc.getAuthor();
	return author ? `[${ author }] ${ title }` : title;
}
