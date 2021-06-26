const fs = require("fs");
const config = require("../config.json");
const deserialize = require("../src/util/deserialize.js");
const getPage = require("../src/util/getPage.js");
const downloadImage = require("../src/util/downloadImage.js");

test("getPage 302", async () => {
	expect(await getPage("https://nhentai.net/g/177013").catch(error => error)).toBe("Error 301: Moved Permanently");
});

test("downloadImage 403", async () => {
	expect(await downloadImage("https://i.nhentai.net/galleries/1385285/2").catch(error => error)).toBe("https://i.nhentai.net/galleries/1385285/2");
});

test("deserialize", async () => {
	const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
	fs.writeFileSync("./temp/temp.pdf", fs.readFileSync("./test/files/temp.pdf"));
	fs.writeFileSync("./temp/temp", fs.readFileSync("./test/files/temp"));
	await deserialize("./temp");
	fs.readFileSync("./temp/[Cloud Flake] Rena, Jibaku.pdf").equals(fs.readFileSync("./test/files/[Cloud Flake] Rena, Jibaku.pdf"));
	expect(mockExit).toHaveBeenCalledWith(0);
});
