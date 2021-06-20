const keys = {
	outputFolderPath: ["outputfolderpath", "outputfolder", "outputpath", "output", "o"],
	executablePath: ["executablepath", "executable", "execpath", "exec", "e"]
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
	if (keys.outputFolderPath.includes(key.toLowerCase())) {
		return "outputFolderPath";
	} else if (keys.executablePath.includes(key.toLowerCase())) {
		return "executablePath";
	} else {
		console.log("Invalid key");
		process.exit(1);
	}
}
