const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const downloadImage = require("../scripts/downloadImage.js");
const displayProgress = require("../scripts/displayProgress.js");

module.exports = {
  async exec(number) {
    const [lastPage, folderName] = await getInfo(number);
    if (!folderName) return;

    if (!fs.existsSync(`./${ folderName }`)) {
      fs.mkdirSync(`./${ folderName }`);
    }

    const promises = await downloadChapter(number, lastPage, folderName);

    displayProgress.exec(promises);

    return Promise.allSettled(promises).then(() => folderName);
  }
};

async function getInfo(number) {
  const html = await axios(`https://hentainexus.com/view/${ number }`)
    .then((response) => response.data)
    .catch((error) => {
      switch (error.response.status) {
        case 404: process.stdout.write("Can't find the sauce!"); break;
      }
    });
  const $ = await cheerio.load(html);

  const lastPage = parseInt(await $("table.view-page-details > tbody").children().eq(5).children().eq(1).text());
  const artist = await $("table.view-page-details > tbody").children().eq(0).children().eq(1).text().replace(/^\s+/g, "").replace(/\s+$/g, "");
  const title = await $("h1.title").text();
  const folderName = `[${ artist }] ${ title }`;

  return [lastPage, folderName];
}

async function downloadChapter(number, lastPage, folderName) {
  let promises = [];
  for (let page = 1; page <= lastPage; page++) {
    const html = await axios(`https://hentainexus.com/read/${ number }/${ page > 99 ? "" : "0" }${ page > 9 ? "" : "0" }${ page }`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
    const $ = await cheerio.load(html);
    const imageUrl = await $("#reader_image > img").attr("src");
    promises.push(downloadImage.exec(imageUrl, folderName, page));
  }
  return promises;
}