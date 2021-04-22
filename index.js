const makePdf = require("./scripts/makePdf.js");
const sauce = process.argv[2];
const flag = process.argv[3] || "";

if (!sauce) return;

const goWebGo = new Promise(resolve => {
	resolve(
		!isNaN(sauce) || flag === "-g" ? require("./sites/nhentai.js")(sauce) :
		// (sauce.includes("kissmanga")) ? require("./sites/kissmanga.js")(sauce) :
		console.log("Invalid input")
	);
});

goWebGo.then(folderName => {
	process.stdout.write("\n");
	makePdf(folderName);
}).catch(error => console.log(error));