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

test("one tag no author", () => {
	expect(formatFileName("COMIC Anthurium 2021-06 [Digital]")).toBe("COMIC Anthurium 2021-06");
});
