const makePdf = require("./src/makePdf.js");
const sauce = process.argv[2];
const flag = process.argv[3] || "";

const goWebGo = new Promise((resolve, reject) => {
  resolve(
    (sauce.includes("hentai.cafe") || flag === "--cafe") ? require("./src/hentaicafe.js").exec(sauce) :
    (flag === "--hn") ? require("./src/hentainexus.js").exec(sauce) :
    (!isNaN(sauce) || flag === "-g") ? require("./src/nhentai.js").exec(sauce) :
    (sauce.includes("imgur")) ? require("./src/imgur.js").exec(sauce) :
    (sauce.includes("kissmanga")) ? require("./src/kissmanga.js").exec(sauce) :
    console.log("Invalid input")
  );
});

goWebGo.then((folderName) => {
  process.stdout.write("\n");
  makePdf.exec(folderName);
}).catch((error) => console.log(error));