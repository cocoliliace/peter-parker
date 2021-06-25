const fs = require("fs");

module.exports = () => fs.rmdirSync("./temp", { recursive: true });
