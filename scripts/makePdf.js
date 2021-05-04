const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = async (title, folder) => {
	const filePath = folder ? `${ folder }/${ title }` : title;

	const doc = new PDFDocument({
		autoFirstPage: false,
		info: {
			Title: title.replace(/\[(.+)\] /, ""),
			Author: title.match(/\[(.+)\]/)?.[1] || ""
		}
	});

	if (folder && !fs.existsSync(`./responsibility/${ folder }`)) {
		fs.mkdirSync(`./responsibility/${ folder }`);
	}
	doc.pipe(fs.createWriteStream(`./responsibility/${ filePath }.pdf`));

	const pages = fs.readdirSync(`./${ filePath }`).length;
	for (let page = 1; page <= pages; page++) {
		/* eslint-disable no-await-in-loop */
		await addPage(doc, filePath, page).catch(console.log);
		/* eslint-ensable no-await-in-loop */
	}
	doc.end();
	removeDirectory(filePath);
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved ./responsibility/${ filePath }.pdf!`);
};

function removeDirectory(title) {
	fs.readdirSync(`./${ title }`).forEach(file => fs.unlinkSync(`./${ title }` + "/" + file));
	fs.rmdirSync(`./${ title }`);
}

function addPage(doc, filePath, page) {
	return new Promise((resolve, reject) => {
		sizeOf(`./${ filePath }/${ page }`, (error, dimensions) => {
			if (error) reject(error);
			resolve(
				doc.addPage({
					margin: 0,
					size: [dimensions.width, dimensions.height]
				}).image(`./${ filePath }/${ page }`, {
					width: dimensions.width,
					height: dimensions.height
				})
			);
		});
	});
}