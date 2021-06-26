const fs = require("fs");

module.exports = () => {
	if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");
};
