const fs = require("fs");

const keys = {
	outputDirectory: ["--outputdirectory", "--output", "-o"],
	executablePath: ["--executablepath", "--execpath", "-e"],
  help: ["--help", "-h"]
};

module.exports = async (config, args) => {
  let exit = true;

  if (keys.help.includes(args[2])) {
    console.log("Help menu coming soon. Read README.md in the mean time :)");
  } else if (args[2] === "config" && typeof args[3] === "undefined") {
    console.log(__dirname.split("/").slice(0, -1).join("/"));
  } else if (args[2] === "config" && args[3].includes("=")) {
    const [key, value] = args[3].split("=");
    config[resolveKey(key)] = value.replace(/\/$/, "");
    await saveConfig(config);
  } else if (args[2] === "config") {
    console.log(config[resolveKey(args[3])]);
  } else {
    parseOptions(config, args);
    exit = false;
  }

  return exit;
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
		fs.writeFile(`${ __dirname }/../config.json`, JSON.stringify(config, null, "  "), error => {
			error ? reject(error) : resolve();
		});
	});
}

function parseOptions(config, args) {
  if (keys.outputDirectory.includes(args[3])) {
    config.outputDirectory = args[4].replace(/\/$/, "");
  } else {
    config.outputDirectory = config.outputDirectory || process.cwd();
  }

  if (keys.executablePath.includes(args[3])) {
    config.executablePath = args[4].replace(/\/$/, "");
  }
}
