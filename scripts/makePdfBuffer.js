const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const folderPath = require("../config.json").folderPath.replace(/\/$/, "");
const blankBuffer = Buffer.from(fs.readFileSync("./blank.jpg"));

module.exports = async (promises, fileName, source) => {
	const doc = await initPdf(fileName, source);

	let rejectedUrls = "";
	for (let i = 0; i < promises.length; i++) {
		await addPage(doc, await promises[i].catch(imageUrl => { // eslint-disable-line no-await-in-loop
			rejectedUrls += `${ i } ${ imageUrl }\n`;
			return blankBuffer;
		})).catch(console.log);
	}

	await serialize(rejectedUrls, fileName, doc);
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
