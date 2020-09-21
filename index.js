const makePdf = require("./src/makePdf.js");
const baseUrl = process.argv[2];
const optional = process.argv[3] ? process.argv[3] : "";

const goWebGo = new Promise((resolve, reject) => {
  resolve(
    (baseUrl.includes("hentai.cafe")) ? require("./src/hentaicafe.js").execute(baseUrl) :
    (baseUrl.length === 4) ? require("./src/hentainexus.js").execute(baseUrl) :
    (baseUrl.length === 6 || optional === "-g") ? require("./src/nhentai.js").execute(baseUrl) :
    (baseUrl.includes("kissmanga")) ? require("./src/kissmanga.js").execute(baseUrl) :
    console.log("Invalid input")
  );
});
goWebGo.then((folderName) => makePdf.execute(folderName));