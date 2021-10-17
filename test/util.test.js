const fs = require("fs");
const config = require("../config.json");
const { PDFDocument } = require("pdf-lib");
const deserialize = require("../src/util/deserialize.js");
const makePdf = require("../src/util/makePdf.js");
const getPage = require("../src/util/getPage.js");
const downloadImage = require("../src/util/downloadImage.js");

test("getPage 302", async () => {
	expect(await getPage("https://nhentai.net/g/177013").catch(error => error)).toBe("Error 301: Moved Permanently");
});

test("downloadImage 403", async () => {
	expect(await downloadImage("https://i.nhentai.net/galleries/1385285/2").catch(error => error)).toBe("https://i.nhentai.net/galleries/1385285/2");
});

test("serialize", async () => {
	const promises = [
		mockReject("https://i.nhentai.net/galleries/1930269/1.jpg"),
		downloadImage("https://i.nhentai.net/galleries/1930269/2.jpg"),
		mockReject("https://i.nhentai.net/galleries/1930269/3.jpg")
	];
	expect(await makePdf(promises, "[Cloud Flake] Rena, Jibaku", "./temp", "https://nhentai.net/g/362267/").catch(error => error)).toBe("Some pages failed to download");
	expect(fs.readFileSync("./temp/temp")).toEqual(fs.readFileSync("./test/files/temp"));
	expect(fs.readFileSync("./temp/temp.pdf")).toEqual(fs.readFileSync("./test/files/temp.pdf"));
});

test("deserialize", async () => {
	const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
	await deserialize("./temp");
	// expect(fs.readFileSync("./temp/[Cloud Flake] Rena, Jibaku.pdf")).toEqual(fs.readFileSync("./test/files/[Cloud Flake] Rena, Jibaku.pdf")); Currently untestable. Need to manually check
	expect(mockExit).toHaveBeenCalledWith(0);
});

function mockReject(value) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(value);
		}, 1000);
	});
}
