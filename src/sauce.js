const formatFileName = require("../src/util/formatFileName.js");

module.exports = (sauce, config) => {
	return new Promise((resolve, reject) => {
		const outputFolderPath = config.get("outputFolderPath") || config.outputFolderPath;
		if (!outputFolderPath) reject("Output folder is not set!");

		Promise.resolve(
			sauce.includes("9hentai") ? require("../src/sites/9hentai.js")(sauce) :
			sauce.includes("e-hentai") ? require("../src/sites/e-hentai.js")(sauce) :
			sauce.includes("hentai2read") ? require("../src/sites/hentai2read.js")(sauce) :
			sauce.includes("hentaimimi") ? require("../src/sites/hentaimimi.js")(sauce) :
			sauce.includes("imgur") ? require("../src/sites/imgur.js")(sauce, config.get("executablePath") || config.executablePath) :
			sauce.includes("joyhentai") ? require("../src/sites/joyhentai.js")(sauce) :
			sauce.includes("kissmanga") ? require("../src/sites/kissmanga.js")(sauce, outputFolderPath) :
			sauce.includes("nhentai") || sauce.match(/^\d{1,6}$/) ? require("../src/sites/nhentai.js")(sauce) :
			reject("Invalid input")
		).then(async ([promises, fileName, source]) => {
			fileName = formatFileName(fileName);
			if (promises) {
				require("../src/util/displayProgress.js")(promises);
				await require("../src/util/makePdf.js")(promises, fileName, outputFolderPath, source);
			}
			resolve(fileName);
		}).catch(reject);
	});
};
