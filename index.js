require("./scripts/deserialize.js")();
const displayProgress = require("./scripts/displayProgress.js");
const formatFileName = require("./scripts/formatFileName.js");
const makePdf = require("./scripts/makePdf.js");

const sauce = process.argv[2];
if (!sauce) return console.log("No sauce given!");

const startTime = process.hrtime();
Promise.resolve(
	sauce.includes("9hentai") ? require("./sites/9hentai.js")(sauce) :
	sauce.includes("e-hentai") ? require("./sites/e-hentai.js")(sauce) :
	sauce.includes("hentai2read") ? require("./sites/hentai2read.js")(sauce) :
	sauce.includes("hentaimimi") ? require("./sites/hentaimimi.js")(sauce) :
	sauce.includes("imgur") ? require("./sites/imgur.js")(sauce) :
	sauce.includes("joyhentai") ? require("./sites/joyhentai.js")(sauce) :
	sauce.includes("kissmanga") ? require("./sites/kissmanga.js")(sauce) :
	sauce.includes("nhentai") || sauce.match(/^\d{1,6}$/) ? require("./sites/nhentai.js")(sauce) :
	console.log("Invalid input")
).then(async ([promises, fileName, source]) => {
	if (promises) {
		fileName = formatFileName(fileName);
		displayProgress(promises);
		await makePdf(promises, fileName, source);
	}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(`Saved "${ fileName }.pdf" in ${ process.hrtime(startTime)[0] }s!`);
	console.log("Courtesy, your friendly neighbourhood Spider-Man");
}).catch(console.log);
