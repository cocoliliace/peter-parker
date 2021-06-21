const keys = {
	outputDirectory: ["--outputdirectory", "--output", "-o"],
	executablePath: ["--executablepath", "--execPath", "-e"]
};

module.exports = (config, input) => {
	if (!input) return console.log(config.path);

	if (input.includes("=")) {
		const [key, value] = input.split("=");
		config.set(resolveKey(key), value.replace(/\/$/, ""));
	} else {
		console.log(config.get(resolveKey(input)));
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
