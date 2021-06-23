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
		throw "Some pages failed to download. Please run \"sauce\" again without any arguments when your internet is stable again";
	} else {
		fs.writeFileSync(`${ outputDirectory }/${ fileName }.pdf`, await doc.save());
	}
};
