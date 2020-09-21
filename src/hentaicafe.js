const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  async execute(baseUrl) {
    let html = await axios(`${ baseUrl }1`).then((response) => response.data).catch((error) => console.log(error));
    let $ = await cheerio.load(html);
    const lastPage = await $("ul.dropdown").children().length;
    const folderName = await $("head > title").text().split(" :: ")[0];
    if (!fs.existsSync(`./${ folderName }`)) await fs.mkdirSync(`./${ folderName }`);
    for (let page = 1; page <= lastPage; page++) {
      html = await axios(`${ baseUrl }${ page }`).then((response) => response.data).catch((error) => console.log(error));
      $ = await cheerio.load(html);
      await axios({
        method: "get",
        url: await $("img.open").attr("src"),
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