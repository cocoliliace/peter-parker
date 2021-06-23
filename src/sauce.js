const makePdf = require("../src/util/makePdf.js");
const displayProgress = require("../src/util/displayProgress.js");
const formatFileName = require("../src/util/formatFileName.js");

module.exports = (sauce, config) => {
	return new Promise((resolve, reject) => {
		Promise.resolve(
			sauce.includes("9hentai") ? require("../src/sites/9hentai.js")(sauce) :
			sauce.includes("e-hentai") ? require("../src/sites/e-hentai.js")(sauce) :
			sauce.includes("hentai2read") ? require("../src/sites/hentai2read.js")(sauce) :
			sauce.includes("hentaimimi") ? require("../src/sites/hentaimimi.js")(sauce) :
			sauce.includes("imgur") ? require("../src/sites/imgur.js")(sauce, config.executablePath) :
			sauce.includes("joyhentai") ? require("../src/sites/joyhentai.js")(sauce) :
			sauce.includes("kissmanga") ? require("../src/sites/kissmanga.js")(sauce, config.outputDirectory) :
			sauce.includes("nhentai") || sauce.match(/^\d{1,6}$/) ? require("../src/sites/nhentai.js")(sauce) :
			reject("Invalid input")
		).then(async ([promises, fileName, source]) => {
			fileName = formatFileName(fileName);
			if (promises) {
				displayProgress(promises);
				await makePdf(promises, fileName, config.outputDirectory, source);
			}
			resolve(fileName);
		}).catch(reject);
	});
};
