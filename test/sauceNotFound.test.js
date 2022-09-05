const sauce = require("#src/sauce");
const config = {
  outputDirectory: "./temp",
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
};

test("9hentai not found", () => {
  return expect(sauce("https://9hentai.to/g/999999", config)).rejects.toBe("Sauce not found!");
});

test("e-hentai not found", () => {
  return expect(sauce("https://e-hentai.org/g/0000000/0000000000", config)).rejects.toBe("Sauce not found!");
});

test("hentai2read not found", () => {
  return expect(sauce("https://hentai2read.com/doesnotexist/", config)).rejects.toBe("Sauce not found!");
});

//test("hentaimimi not found", () => {
//	return expect(sauce("https://hentaimimi.com/view/0000000", config)).rejects.toBe("Sauce not found!");
//});

//test("imgur not found", () => {
//	return expect(sauce("https://imgur.com/0000000", config)).rejects.toBe("Sauce not found!");
//});

//test("joyhentai not found", () => {
//	return expect(sauce("https://joyhentai.com/detail/0000000o000000.html", config)).rejects.toMatch("Sauce not found!");
//});

test("kissmanga not found", () => {
  return expect(sauce("https://kissmanga.org/manga/doesnotexist", config)).rejects.toBe("Sauce not found!");
});

test("nhentai not found", () => {
  return expect(sauce("999999", config)).rejects.toBe("Sauce not found!");
});
