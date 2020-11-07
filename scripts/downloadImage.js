const fs = require("fs");
const axios = require("axios");

module.exports = {
  exec(imageUrl, folderName, page) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: imageUrl,
        responseType: "stream"
      }).then((response) => {
        const file = fs.createWriteStream(`./${ folderName }/${ page }.jpg`);
        response.data.pipe(file);
        file.on("finish", () => resolve());
      }).catch((error) => {
        switch (error.response.status) {
          case 503: resolve(this.exec(imageUrl, folderName, page)); break;
        }
      });
    });
  }
}