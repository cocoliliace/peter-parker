const sauce = process.argv[2];
if (!sauce) return console.log("No sauce given!");

const goWebGo = new Promise(resolve => {
	resolve(
		sauce.includes("e-hentai") ? require("./sites/e-hentai.js")(sauce) :
		sauce.includes("hentai2read") ? require("./sites/hentai2read.js")(sauce) :
		sauce.includes("hentaimimi") ? require("./sites/hentaimimi.js")(sauce) :
		sauce.includes("joyhentai") ? require("./sites/joyhentai.js")(sauce) :
		sauce.includes("kissmanga") ? require("./sites/kissmanga.js")(sauce) :
		sauce.match(/^\d{1,6}$/) ? require("./sites/nhentai.js")(sauce) :
		console.log("Invalid input")
	);
});

goWebGo.then(() => console.log("Courtesy, your friendly neighbourhood Spider-Man")).catch(console.log);