const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  async execute(baseUrl) {
    const html = await axios(`https://nhentai.net/g/${ baseUrl }`).then((response) => response.data).catch((error) => console.log(error));
    const $ = await cheerio.load(html);
    const lastPage = await $("#tags").children().eq(-2).children().text();
    const artist = await $("#tags").children().eq(3).children().eq(0).children().eq(0).children().eq(0).text();
    const folderName = `[${ artist.charAt(0).toUpperCase() + artist.slice(1) }] ${ $("head > title").text().split(" » ")[0] }`;
    if (!fs.existsSync(`./${ folderName }`)) await fs.mkdirSync(`./${ folderName }`);
    const serverLibrary = (await $("head").children().eq(3).attr("content")).match(/\d+/)[0];
    for (let page = 1; page <= lastPage; page++) {
      await axios({
        method: "get",
        url: `https://i.nhentai.net/galleries/${ serverLibrary }/${ page }.jpg`,
        responseType: "stream"
      }).then(async (response) => {
        await response.data.pipe(fs.createWriteStream(`./${ folderName }/${ page }.jpg`));
        console.clear();
        console.log(`Downloaded page ${ page }`);
      }).catch(async (error) => {
        await axios({
          method: "get",
          url: `https://i.nhentai.net/galleries/${ serverLibrary }/${ page }.png`,
          responseType: "stream"
        }).then(async (response) => {
          await response.data.pipe(fs.createWriteStream(`./${ folderName }/${ page }.jpg`));
          console.clear();
          console.log(`Downloaded page ${ page }`);
        }).catch((error) => console.log(error));
      });
    }
    return folderName;
  }
};