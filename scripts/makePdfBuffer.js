const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = async (fileName, promises, source, startTime) => {
	const doc = new PDFDocument({
		autoFirstPage: false,
		info: {
			Title: fileName.replace(/\[(.+)\] /, ""),
			Author: fileName.match(/\[(.+)\]/)?.[1] || "",
			Subject: source
		}
	});

	doc.pipe(fs.createWriteStream(`./responsibility/${ fileName }.pdf`));

	for (const promise of promises) {
		await addPage(doc, await promise).catch(console.log); // eslint-disable-line no-await-in-loop
	}
	doc.end();
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved "${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
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
