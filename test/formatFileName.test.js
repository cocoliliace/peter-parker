const formatFileName = require("../src/util/formatFileName.js");

test("no change", () => {
	expect(formatFileName("[Ching Chang] peter-parker")).toBe("[Ching Chang] peter-parker");
});

test("two titles, comic, and multiple tags", () => {
	expect(formatFileName("[Azuma Tesshin] Ichigo Cake to Mont Blanc | Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister. (COMIC Kairakuten 2018-05) [English] [Tamamo | GDS] [Digital]")).toBe("[Azuma Tesshin] Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister");
});

test("chinese, comic, and tag", () => {
	expect(formatFileName("[東鉄神] 故郷 (COMIC 快楽天 2015年12月号) [beamsinbox汉化]")).toBe("[東鉄神] 故郷");
});

test("front bracket", () => {
	expect(formatFileName("(COMIC1☆9) [Renai Mangaka (Naruse Hirofumi)] Kuchikukan Shinsui! (Kantai Collection -KanColle-)")).toBe("[Renai Mangaka (Naruse Hirofumi)] Kuchikukan Shinsui! (Kantai Collection -KanColle-)");
});

test("curly bracket", () => {
	expect(formatFileName("[Hendon-Ya (Sukedai)] Untitled (Henka-kei-bo TF Account book Vol.2) [English] {Hennojin}")).toBe("[Hendon-Ya (Sukedai)] Untitled (Henka-kei-bo TF Account book Vol.2)");
});

test("-, comic, and multiple tags", () => {
	expect(formatFileName("[Achumuchi] Gal no OnaPet - Gal's Onapet Ch. 5 (COMIC Anthurium 2021-03) [English] [Digital]")).toBe("[Achumuchi] Gal no OnaPet - Gal's Onapet Ch. 5");
});

test("front bracket with unicode", () => {
	expect(formatFileName("(COMIC1☆2) [SHi's Laboratory (SHINGO)] Pai ☆ Mate 4 (Mahou Sensei Negima!)")).toBe("[SHi's Laboratory (SHINGO)] Pai ☆ Mate 4 (Mahou Sensei Negima!)");
});

test("two titles", () => {
	expect(formatFileName("[Nori5rou] Imaizumin-chi wa Douyara Gal no Tamariba ni Natteru Rashii 2 | IMAIZUMI BRINGS ALL THE GYARUS TO HIS HOUSE 2")).toBe("[Nori5rou] IMAIZUMI BRINGS ALL THE GYARUS TO HIS HOUSE 2");
});

test("front comic, one tag no author", () => {
	expect(formatFileName("COMIC Anthurium 2021-06 [Digital]")).toBe("Anthurium 2021-06");
});

test("no space before tag", () => {
	expect(formatFileName("[laliberte] 生日[一只麻利的鸽子汉化]")).toBe("[laliberte] 生日");
});

test("front tag, two titles, end bracket, and multiple tags", () => {
	expect(formatFileName("(Shotaket 12) [Rorororomo (Makita Masaki)] Chikai | My Oath (Shounen Iro Zukan 5 ~Shoujosou 2~) [English] [NewsMedia] [Decensored]")).toBe("[Rorororomo (Makita Masaki)] My Oath (Shounen Iro Zukan 5 ~Shoujosou 2~)");
});

test("front comic with no bracket", () => {
	expect(formatFileName("Comic Rin Vol. 19 [2006-07]")).toBe("Rin Vol. 19");
});

test("no space after artist", () => {
	expect(formatFileName("[タリホウ]夏休み明け学校に行")).toBe("[タリホウ] 夏休み明け学校に行");
});

test("escape forward slash, no title", () => {
	expect(formatFileName("Fate/Grand Order")).toBe("Fate∕Grand Order");
});
