const fs = require("fs");
const sauce = require("../src/sauce.js");
const config = {
	outputDirectory: "./temp",
	executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
};

test("nhentai download", async () => {
	expect(await sauce("https://nhentai.net/g/274206", config)).toBe("[clesta (Cle Masahiro)] CL-Paper");
	fs.readFileSync("./temp/[clesta (Cle Masahiro)] CL-Paper.pdf").equals(fs.readFileSync("./test/files/[clesta (Cle Masahiro)] CL-Paper.pdf"));
});

test("nhentai download no artist field", async () => {
	expect(await sauce("239098", config)).toBe("[Shivharu] syota vore a tiny");
	fs.readFileSync("./temp/[Shivharu] syota vore a tiny.pdf").equals(fs.readFileSync("./test/files/[Shivharu] syota vore a tiny.pdf"));
}, 10000);

test("nhentai download no artist field no artist", async () => {
	expect(await sauce("146594", config)).toBe("1");
	fs.readFileSync("./temp/1.pdf").equals(fs.readFileSync("./test/files/1.pdf"));
});

test("kissmanga download", async () => {
	expect(await sauce("https://kissmanga.org/manga/manga-qg968289", config)).toBe("Prologue");
	fs.readFileSync("./temp/Prologue/chapter-0.pdf").equals(fs.readFileSync("./test/files/Prologue/chapter-0.pdf"));
});

test("kissmanga download folder exists", async () => {
	fs.mkdirSync("./temp/A Silent Greeting");
	expect(await sauce("https://kissmanga.org/manga/manga-qo960771", config)).toBe("A Silent Greeting");
	fs.readFileSync("./temp/A Silent Greeting/chapter-0.pdf").equals(fs.readFileSync("./test/files/A Silent Greeting/chapter-0.pdf"));
});

test("joyhentai download", async () => {
	expect(await sauce("https://joyhentai.com/detail/1220147o232052.html", config)).toBe("[TAKE-DAKE (yuuki)] Rakugaki Bon");
	fs.readFileSync("./temp/[TAKE-DAKE (yuuki)] Rakugaki Bon.pdf").equals(fs.readFileSync("./test/files/[TAKE-DAKE (yuuki)] Rakugaki Bon.pdf"));
});

test("9hentai download", async () => {
	expect(await sauce("https://9hentai.to/g/70905/", config)).toBe("[Marushamo] Namaiki JK squeezes everything");
	fs.readFileSync("./temp/[Marushamo] Namaiki JK squeezes everything.pdf").equals(fs.readFileSync("./test/files/[Marushamo] Namaiki JK squeezes everything.pdf"));
});

test("e-hentai download", async () => {
	expect(await sauce("https://e-hentai.org/g/1941434/25dc3994e6/", config)).toBe("[Ankoman] Mash, Boggart ni Kioku Soushitsu Wakan NTR (Fate∕Grand Order)");
	fs.readFileSync("./temp/[Ankoman] Mash, Boggart ni Kioku Soushitsu Wakan NTR (Fate∕Grand Order).pdf").equals(fs.readFileSync("./test/files/[Ankoman] Mash, Boggart ni Kioku Soushitsu Wakan NTR (Fate∕Grand Order).pdf"));
});
