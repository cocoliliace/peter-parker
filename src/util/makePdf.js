const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const serialize = require("./serialize.js");
const blankBuffer = Buffer.from(fs.readFileSync(`${__dirname}/../../static/blank.jpg`));

module.exports = async (promises, fileName, outputDirectory, source) => {
  const doc = await initPdf(fileName, source);

  let rejectedUrls = "";
  for (let i = 0; i < promises.length; i++) {
    await addPage(doc, await promises[i].catch(imageUrl => { // eslint-disable-line no-await-in-loop
      rejectedUrls += `${i + 1} ${imageUrl}\n`;
      return blankBuffer;
    })).catch(error => { throw error; });
  }

  await serialize(rejectedUrls, fileName, outputDirectory, doc).catch(error => { throw error; });
};

async function initPdf(fileName, source) {
  const doc = await PDFDocument.create({ updateMetadata: false });
  doc.setTitle(fileName.replace(/\[(.+)\] /, ""));
  doc.setAuthor(fileName.match(/\[(.+)\]/)?.[1] || "");
  doc.setSubject(source);
  return doc;
}

async function addPage(doc, buffer) {
  const image = await doc.embedJpg(buffer).catch(async () => {
    return await doc.embedPng(buffer).catch(error => { throw error; });
  });
  doc.addPage([image.width, image.height]).drawImage(image);
}
