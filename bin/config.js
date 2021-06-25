const fs = require("fs");

const keys = {
	outputDirectory: ["--outputdirectory", "--output", "-o"],
	executablePath: ["--executablepath", "--execPath", "-e"]
};

module.exports = async (config, input) => {
	if (!input) return console.log(__dirname.split("/").slice(0, -1).join("/"));

	if (input.includes("=")) {
		const [key, value] = input.split("=");
		config[resolveKey(key)] = value.replace(/\/$/, "");
		await saveConfig(config);
	} else {
		console.log(config[resolveKey(input)]);
	}
};

function resolveKey(key) {
	key = key.toLowerCase();
	if (keys.outputDirectory.includes(key)) {
		return "outputDirectory";
	} else if (keys.executablePath.includes(key)) {
		return "executablePath";
	} else {
		console.log("Invalid key");
		process.exit(1);
	}
}

function saveConfig(config) {
	return new Promise((resolve, reject) => {
		fs.writeFile(`${ __dirname }/../config.json`, JSON.stringify(config, null, "	"), error => {
			error ? reject(error) : resolve();
		});
	});
}
