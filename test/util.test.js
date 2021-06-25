const getPage = require("../src/util/getPage.js");
const downloadImage = require("../src/util/downloadImage.js");

test("getPage 302", async () => {
	expect(await getPage("https://nhentai.net/g/177013").catch(error => error)).toBe("Error 301: Moved Permanently");
});

test("downloadImage 403", async () => {
	expect(await downloadImage("https://i.nhentai.net/galleries/1385285/2").catch(error => error)).toBe("https://i.nhentai.net/galleries/1385285/2");
});
