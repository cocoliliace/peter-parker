const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = async (fileName, buffers, source) => {
	const doc = new PDFDocument({
		autoFirstPage: false,
		info: {
			Title: fileName.replace(/\[(.+)\] /, ""),
			Author: fileName.match(/\[(.+)\]/)?.[1] || "",
			Subject: source
		}
	});

	doc.pipe(fs.createWriteStream(`./responsibility/${ fileName }.pdf`));

	for (const buffer of buffers) {
		/* eslint-disable no-await-in-loop */
		await addPage(doc, buffer).catch(console.log);
		/* eslint-ensable no-await-in-loop */
	}
	doc.end();
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved ./responsibility/${ fileName }.pdf!`);
};

function addPage(doc, buffer) {
	return new Promise(resolve => {
		const dimensions = sizeOf(buffer);
		resolve(
			doc.addPage({
				margin: 0,
				size: [dimensions.width, dimensions.height]
			}).image(buffer, {
				width: dimensions.width,
				height: dimensions.height
			})
		);
	});
}
