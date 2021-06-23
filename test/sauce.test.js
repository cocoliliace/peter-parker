const fs = require("fs");
const sauce = require("../src/sauce.js");
const config = {
	outputDirectory: "./temp",
	executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
};

beforeAll(() => {
	if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");
});
afterAll(() => fs.rmdirSync("./temp", { recursive: true }));

test("9hentai not found", () => {
	return expect(sauce("https://9hentai.to/g/999999", config)).rejects.toBe("Sauce not found!");
});

test("e-hentai not found", () => {
	return expect(sauce("https://e-hentai.org/g/0000000/0000000000", config)).rejects.toBe("Sauce not found!");
});

test("hentai2read not found", () => {
	return expect(sauce("https://hentai2read.com/doesnotexist/", config)).rejects.toBe("Sauce not found!");
});

test("hentaimimi not found", () => {
	return expect(sauce("https://hentaimimi.com/view/0000000", config)).rejects.toBe("Sauce not found!");
});

//test("imgur not found", () => {
//	return expect(sauce("https://imgur.com/0000000", config)).rejects.toBe("Sauce not found!");
//}, 30000);

test("joyhentai not found", () => {
	return expect(sauce("https://joyhentai.com/detail/0000000o000000.html", config)).rejects.toMatch("Sauce not found!");
});

test("kissmanga not found", () => {
	return expect(sauce("https://kissmanga.org/manga/doesnotexist", config)).rejects.toBe("Sauce not found!");
});

test("nhentai not found", () => {
	return expect(sauce("999999", config)).rejects.toBe("Sauce not found!");
});

test("nhentai download", async () => {
	expect(await sauce("274206", config)).toBe("[clesta (Cle Masahiro)] CL-Paper");
	fs.readFileSync("./temp/[clesta (Cle Masahiro)] CL-Paper.pdf").equals(fs.readFileSync("./test/files/[clesta (Cle Masahiro)] CL-Paper.pdf"));
});

test("kissmanga download", async () => {
	expect(await sauce("https://kissmanga.org/manga/manga-qg968289", config)).toBe("Prologue");
	fs.readFileSync("./temp/Prologue/chapter-0.pdf").equals(fs.readFileSync("./test/files/chapter-0.pdf"));
});
