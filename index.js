const displayProgress = require("./scripts/displayProgress.js");
const makePdf = require("./scripts/makePdfBuffer.js");
const formatFileName = require("./scripts/formatFileName.js");

const sauce = process.argv[2];
if (!sauce) return console.log("No sauce given!");

Promise.resolve(
	sauce.includes("9hentai") ? require("./sites/9hentai.js")(sauce) :
	sauce.includes("e-hentai") ? require("./sites/e-hentai.js")(sauce) :
	sauce.includes("hentai2read") ? require("./sites/hentai2read.js")(sauce) :
	sauce.includes("hentaimimi") ? require("./sites/hentaimimi.js")(sauce) :
	sauce.includes("joyhentai") ? require("./sites/joyhentai.js")(sauce) :
	sauce.includes("kissmanga") ? require("./sites/kissmanga.js")(sauce) :
	sauce.includes("nhentai") || sauce.match(/^\d{1,6}$/) ? require("./sites/nhentai.js")(sauce) :
	console.log("Invalid input")
).then(([promises, fileName, url]) => {
	displayProgress(promises);
	Promise.all(promises).then(async buffers => {
		await makePdf(formatFileName(fileName), buffers, url);
		console.log("Courtesy, your friendly neighbourhood Spider-Man");
	});
}).catch(console.log);
