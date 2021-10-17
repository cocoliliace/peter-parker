const fs = require("fs");

module.exports = () => {
	if (fs.existsSync("./temp")) fs.rmdirSync("./temp", { recursive: true });
	fs.mkdirSync("./temp");
};
