const fs = require("fs");

module.exports = () => fs.rmSync("./temp", { recursive: true });
