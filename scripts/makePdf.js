const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = async (title) => {
	if (!title) return;

	const doc = new PDFDocument({
		autoFirstPage: false,
		info: {
			Title: title.replace(/\[(.+)\] /, ""),
			Author: title.match(/\[(.+)\]/)?.[1]
		}
	});
	doc.pipe(fs.createWriteStream(`./responsibility/${ title }.pdf`));

	const pages = fs.readdirSync(`./${ title }`).length;
	for (let page = 1; page <= pages; page++) {
		/* eslint-disable no-await-in-loop */
		await addPage(doc, title, page);
		/* eslint-ensable no-await-in-loop */
	}
	doc.end();
	removeDirectory(title);
	console.log(`Saved ./responsibility/${ title }.pdf!`);
	console.log("Courtesy, your friendly neighbourhood Spider-Man");
};

function removeDirectory(title) {
	fs.readdirSync(`./${ title }`).forEach(file => fs.unlinkSync(`./${ title }` + "/" + file));
	fs.rmdirSync(`./${ title }`);
}

function addPage(doc, title, page) {
	return new Promise(resolve => {
		sizeOf(`./${ title }/${ page }.jpg`, (error, dimensions) => {
			resolve(
				doc.addPage({
					margin: 0,
					size: [dimensions.width, dimensions.height]
				}).image(`./${ title }/${ page }.jpg`, {
					width: dimensions.width,
					height: dimensions.height
				}));
		});
	});
}