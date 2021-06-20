const fs = require("fs");
const Conf = require("conf");
const config = new Conf();
const outputFolderPath = config.get("outputFolderPath");
const { PDFDocument } = require("pdf-lib");
const downloadImage = require("./downloadImage.js");

module.exports = async () => {
	if (!fs.existsSync(`${ outputFolderPath }/temp`)) return;

	const doc = await PDFDocument.load(fs.readFileSync(`${ outputFolderPath }/temp.pdf`));
	const lines = fs.readFileSync(`${ outputFolderPath }/temp`).split("\n");

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
	const image = await doc.embedJpg(buffer).catch(async () => await doc.embedPng(buffer).catch(error => { throw error; }));
	doc.removePage(page);
	doc.insertPage(page, [image.width, image.height]).drawImage(image);
}

async function serialize(data, fileName, doc) {
	if (data) {
		fs.writeFileSync(`${ outputFolderPath }/temp`, data, error => {
			if (error) throw error;
		});
		fs.writeFileSync(`${ outputFolderPath }/temp.pdf`, await doc.save());
	} else {
		fs.writeFileSync(`${ outputFolderPath }/${ fileName }.pdf`, await doc.save());
	}
}
