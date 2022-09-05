const fs = require("fs");

module.exports = () => {
  if (fs.existsSync("./temp")) fs.rmSync("./temp", { recursive: true });
  fs.mkdirSync("./temp");
};
