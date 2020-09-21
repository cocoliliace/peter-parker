const fs = require("fs");
const sizeOf = require("image-size");
const PDFDocument = require("pdfkit");

module.exports = {
  async execute(path) {
    let doc = new PDFDocument({
      autoFirstPage: false,
      info: {
        Title: path.replace(/\[(.+)\] /, ""),
        Author: path.match(/\[(.+)\]/)[1]
      }
    });
    doc.pipe(fs.createWriteStream(`./responsibility/${ path }.pdf`));

    const pages = fs.readdirSync(`./${ path }`).length;
    for (let page = 1; page <= pages; page++) {
      const insertPage = new Promise((resolve, reject) => {
        sizeOf(`./${ path }/${ page }.jpg`, (error, dimensions) => {
          resolve(doc.addPage({
            margin: 0,
            size: [dimensions.width, dimensions.height]
          }).image(`./${ path }/${ page }.jpg`, {
            width: dimensions.width,
            height: dimensions.height
          }));
        })
      });
      await insertPage;
    }
    doc.end();
    const folder = fs.readdirSync(`./${ path }`);
    folder.forEach((file) => {
      fs.unlinkSync(`./${ path }` + "/" + file);
    });
    fs.rmdirSync(`./${ path }`);
    console.log(`Saved ${ path }.pdf!`)
  }
};