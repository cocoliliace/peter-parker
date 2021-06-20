const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const blankBuffer = Buffer.from(fs.readFileSync(`${ __dirname }/../../static/blank.jpg`));

module.exports = async (promises, fileName, outputFolderPath, source) => {
	const doc = await initPdf(fileName, source);

	let rejectedUrls = "";
	for (let i = 0; i < promises.length; i++) {
		await addPage(doc, await promises[i].catch(imageUrl => { // eslint-disable-line no-await-in-loop
			rejectedUrls += `${ i } ${ imageUrl }\n`;
			return blankBuffer;
		})).catch(console.log);
	}

	await serialize(rejectedUrls, fileName, outputFolderPath, doc);
};

async function initPdf(fileName, source) {
	const doc = await PDFDocument.create();
	doc.setTitle(fileName.replace(/\[(.+)\] /, ""));
	doc.setAuthor(fileName.match(/\[(.+)\]/)?.[1] || "");
	doc.setSubject(source);
	return doc;
}

async function addPage(doc, buffer) {
	const image = await doc.embedJpg(buffer).catch(async () => await doc.embedPng(buffer).catch(console.log));
	doc.addPage([image.width, image.height]).drawImage(image);
}

async function serialize(data, fileName, outputFolderPath, doc) {
	try {
		if (data) {
			fs.writeFileSync(`${ outputFolderPath }/temp`, data, error => {
				if (error) console.log(error);
			});
			fs.writeFileSync(`${ outputFolderPath }/temp.pdf`, await doc.save());
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log("Some pages failed to download. Please run \"sauce\" again without any arguments when your internet is stable again");
		} else {
			fs.writeFileSync(`${ outputFolderPath }/${ fileName }.pdf`, await doc.save());
		}
	} catch(e) {
		if (e.code === "ENOENT") {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log("Failed because the output folder path you specified does not exist!");
			process.exit(1);
		}
		console.dir(e.code);
	}
}
