const fs = require("fs");
const folderPath = require("../config.json").folderPath.replace(/\/$/, "");
const { PDFDocument } = require("pdf-lib");
const downloadImage = require("./downloadImage.js");

module.exports = async () => {
	if (!fs.existsSync(`${ folderPath }/temp`)) return;

	const doc = await PDFDocument.load(fs.readFileSync(`${ folderPath }/temp.pdf`));
	const lines = fs.readFileSync(`${ folderPath }/temp`).split("\n");

	let rejectedUrls = "";
	let promises = [];
	for (let i = 0; i < lines.length; i++) {
		const [page, url] = lines[i].split(" ");
		promises.push(downloadImage(url).then(buffer => updatePage(doc, buffer, page))
			.catch(() => rejectedUrls += lines[i] + "\n"));
	}

	await Promise.allSettled(promises);
	await serialize();
	process.exit(0);
};

async function updatePage(doc, buffer, page) {
	const image = await doc.embedJpg(buffer).catch(async () => await doc.embedPng(buffer).catch(console.log));
	doc.removePage(page);
	doc.insertPage(page, [image.width, image.height]).drawImage(image);
}

async function serialize(data, fileName, doc) {
	if (data) {
		fs.writeFileSync(`${ folderPath }/temp`, data, error => {
			if (error) console.log(error);
		});
		fs.writeFileSync(`${ folderPath }/temp.pdf`, await doc.save());
	} else {
		fs.writeFileSync(`${ folderPath }/${ fileName }.pdf`, await doc.save());
	}
}
