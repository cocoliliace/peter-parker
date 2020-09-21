const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  async execute(baseUrl) {
    let html = await axios(`https://hentainexus.com/view/${ baseUrl }`).then((response) => response.data).catch((error) => console.log(error));
    let $ = await cheerio.load(html);
    const lastPage = parseInt(await $("table.view-page-details > tbody").children().eq(5).children().eq(1).text());
    const folderName = `[${ await $("table.view-page-details > tbody").children().eq(0).children().eq(1).text().replace(/^\s+/g, "").replace(/\s+$/g, "") }] ${ await $("h1.title").text() }`
    if (!fs.existsSync(`./${ folderName }`)) await fs.mkdirSync(`./${ folderName }`);
    for (let page = 1; page <= lastPage; page++) {
      html = await axios(`https://hentainexus.com/read/${ baseUrl }/${ page > 99 ? "" : "0" }${ page > 9 ? "" : "0" }${ page }`).then((response) => response.data).catch((error) => console.log(error));
      $ = await cheerio.load(html);
      await axios({
        method: "get",
        url: await $("#reader_image > img").attr("src"),
        responseType: "stream"
      }).then(async (response) => {
        await response.data.pipe(fs.createWriteStream(`./${ folderName }/${ page }.jpg`));
        console.clear();
        console.log(`Downloaded page ${ page }`);
      }).catch((error) => console.log(error));
    }
    return folderName;
  }
};