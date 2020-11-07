const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = {
  async exec(title) {
    if (!title) return;

    let doc = new PDFDocument({
      autoFirstPage: false,
      info: {
        Title: title.replace(/\[(.+)\] /, ""),
        Author: title.match(/\[(.+)\]/)[1] || "Unknown Author"
      }
    });
    doc.pipe(fs.createWriteStream(`./responsibility/${ title }.pdf`));

    const pages = fs.readdirSync(`./${ title }`).length;
    for (let page = 1; page <= pages; page++) {
      await addPage(doc, title, page);
    }
    doc.end();
    removeDirectory(title);
    console.log(`Saved ./responsibility/${ title }.pdf!`)
  }
};

function removeDirectory(title) {
  const folder = fs.readdirSync(`./${ title }`);
  folder.forEach((file) => {
    fs.unlinkSync(`./${ title }` + "/" + file);
  });
  fs.rmdirSync(`./${ title }`);
}

function addPage(doc, title, page) {
  return new Promise((resolve, reject) => {
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