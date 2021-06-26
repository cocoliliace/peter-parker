const fs = require("fs");
const readline = require("readline");

module.exports = async (data, fileName, outputDirectory, doc) => {
	if (data) {
		fs.writeFileSync(`${ outputDirectory }/temp`, data, error => {
			if (error) throw error;
		});
		fs.writeFileSync(`${ outputDirectory }/temp.pdf`, await doc.save());
		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		return Promise.reject("Some pages failed to download");
	} else {
		fs.writeFileSync(`${ outputDirectory }/${ fileName }.pdf`, await doc.save());
	}
};
