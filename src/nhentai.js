const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const downloadImage = require("./downloadImage.js");
const displayProgress = require("./displayProgress");

module.exports = {
  async exec(number) {
    const html = await axios(`https://nhentai.net/g/${ number }`)
      .then((response) => response.data)
      .catch((error) => {
        switch (error.response.status) {
          case 404: process.stdout.write("Can't find the sauce!"); break;
        }
      });
    if (!html) return;
    const $ = await cheerio.load(html);

    const [lastPage, folderName] = await getInfo($);

    if (!fs.existsSync(`./${ folderName }`)) {
      fs.mkdirSync(`./${ folderName }`);
    }

    const promises = await downloadChapter($, lastPage, folderName);

    displayProgress.exec(promises);

    return Promise.allSettled(promises).then(() => folderName);
  }
};

async function getInfo($) {
  const lastPage = await $("#tags").children().eq(-2).children().text();
  const artist = await $("#tags").children().eq(3).children().eq(0).children().eq(0).children().eq(0).text();
  const title = await $("head > title").text().split(" » ")[0].replace("/", "");
  const folderName = `[${ artist.replace(/\b[a-z]/g, (match) => match.toUpperCase()) }] ${ title }`;

  return [lastPage, folderName];
}

async function downloadChapter($, lastPage, folderName) {
  let promises = [];
  for (let page = 1; page <= lastPage; page++) {
    const imageUrl = $(".thumbs").children().eq(page - 1).children().eq(0).children().eq(0).attr("data-src").replace("t.", "i.").replace("t.", ".");
    promises.push(downloadImage.exec(imageUrl, folderName, page));
  }
  return promises;
}