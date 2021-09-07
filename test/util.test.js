const fs = require("fs");
const config = require("../config.json");
const { PDFDocument } = require("pdf-lib");
const deserialize = require("../src/util/deserialize.js");
const serialize = require("../src/util/serialize.js");
const getPage = require("../src/util/getPage.js");
const downloadImage = require("../src/util/downloadImage.js");

test("getPage 302", async () => {
	expect(await getPage("https://nhentai.net/g/177013").catch(error => error)).toBe("Error 301: Moved Permanently");
});

test("downloadImage 403", async () => {
	expect(await downloadImage("https://i.nhentai.net/galleries/1385285/2").catch(error => error)).toBe("https://i.nhentai.net/galleries/1385285/2");
});

test("serialize", async () => {
	const data = "1 https://i.nhentai.net/galleries/1930269/1.jpg\n3 https://i.nhentai.net/galleries/1930269/3.jpg";
	const doc = await PDFDocument.load(fs.readFileSync("./test/files/temp.pdf"), { updateMetadata: false });
	expect(await serialize(data, "[Cloud Flake] Rena, Jibaku", "./temp", doc).catch(error => error)).toBe("Some pages failed to download");
	fs.readFileSync("./temp/temp").equals(fs.readFileSync("./test/files/temp"));
	fs.readFileSync("./temp/temp.pdf").equals(fs.readFileSync("./test/files/temp.pdf"));
});

test("deserialize", async () => {
	const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
	await deserialize("./temp");
	fs.readFileSync("./temp/[Cloud Flake] Rena, Jibaku.pdf").equals(fs.readFileSync("./test/files/[Cloud Flake] Rena, Jibaku.pdf"));
	expect(mockExit).toHaveBeenCalledWith(0);
});
