const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  async execute(baseUrl) {
    const folderName = $("head > title").text().replace("Read ", "").replace(" Online Free | KissManga", "").slice(0, 255);
    if (!fs.existsSync(`./${ folderName }`)) await fs.mkdirSync(`./${ folderName }`);
    for (let chapter = 1; chapter <= 199; chapter++) {
      const html = await axios(`${ baseUrl }${ chapter }`).then((response) => response.data).catch((error) => console.log(error));
      const $ = await cheerio.load(html);
      const pages = await $("#centerDivVideo");
      if (!fs.existsSync(`./${ folderName }/chapter${ chapter }`)) await fs.mkdirSync(`./${ folderName }/chapter${ chapter }`);
      for (let page = 0; page < pages.length - 1; page++) {
        await axios({
          method: "get",
          url: pages.children().eq(page).attr("src"),
          responseType: "stream"
        }).then(async (response) => {
          await response.data.pipe(fs.createWriteStream(`./${ folderName }/chapter${ chapter }/${ page + 1 }.jpg`));
          console.clear();
          console.log(`Downloaded page ${ page + 1 }`)
        }).catch((error) => console.log(error));
      }
    }
    return foldername;
  }
};