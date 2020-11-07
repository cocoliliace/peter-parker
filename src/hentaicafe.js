const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const downloadImage = require("./downloadImage.js");
const displayProgress = require("./displayProgress");

module.exports = {
  async exec(sauce) {
    const baseUrl = isNaN(sauce) ? sauce : await getLink(sauce);
    if (!baseUrl) return;

    const [lastPage, folderName, imageBaseUrl] = await getInfo(baseUrl);

    if (!fs.existsSync(`./${ folderName }`)) {
      fs.mkdirSync(`./${ folderName }`);
    }

    const promises = await downloadChapter(imageBaseUrl, lastPage, folderName);

    displayProgress.exec(promises);

    return Promise.allSettled(promises).then(() => folderName);
  }
};

async function getLink(number) {
  const html = await axios(`https://hentai.cafe/hc.fyi/${ number }`)
    .then((response) => response.data)
    .catch((error) => {
      switch (error.response.status) {
        case 404: process.stdout.write("Can't find the sauce!"); break;
      }
    });
  if (!html) return;
  const $ = await cheerio.load(html);

  const baseUrl = `${ await $("a.x-btn-large").attr("href") }page/`;

  return baseUrl;
}

async function getInfo(baseUrl) {
  const html = await axios(`${ baseUrl }1`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  const $ = await cheerio.load(html);

  const lastPage = await $("ul.dropdown").children().length;
  const folderName = await $("head > title").text().split(" :: ")[0];
  const imageBaseUrl = await $("#page > div > a > img").attr("src").slice(0, -6);

  return [lastPage, folderName, imageBaseUrl];
}

async function downloadChapter(imageBaseUrl, lastPage, folderName) {
  let promises = [];
  for (let page = 1; page <= lastPage; page++) {
    const imageUrl = `${ imageBaseUrl }${ page > 9 ? "" : "0" }${ page }.jpg`;
    promises.push(downloadImage.exec(imageUrl, folderName, page));
  }
  return promises;
}