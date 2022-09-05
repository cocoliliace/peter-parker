const makePdf = require("#utils/makePdf");
const displayProgress = require("#utils/displayProgress");
const formatFileName = require("#utils/formatFileName");

module.exports = (sauce, config) => {
  return new Promise((resolve, reject) => {
    const site = sauce.includes("9hentai") ? require("#sites/9hentai") :
      sauce.includes("e-hentai") ? require("#sites/e-hentai") :
      sauce.includes("hentai2read") ? require("#sites/hentai2read") :
      //sauce.includes("hentaimimi") ? require("#sites/hentaimimi") :
      sauce.includes("imgur") ? require("#sites/imgur") :
      sauce.includes("joyhentai") ? require("#sites/joyhentai") :
      sauce.includes("kissmanga") ? require("#sites/kissmanga") :
      sauce.includes("nhentai") || sauce.match(/^\d{1,6}$/) ? require("#sites/nhentai") :
      reject("Invalid input");
    Promise.resolve(site(sauce)).then(async ([promises, fileName, source]) => {
      fileName = formatFileName(fileName);
      if (promises) {
        displayProgress(promises);
        await makePdf(promises, fileName, config.outputDirectory, source);
      }
      resolve(fileName);
    }).catch(reject);
  });
};
