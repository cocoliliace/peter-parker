const sauce = process.argv[2];
const flag = process.argv[3] || "";

if (!sauce) return;

const goWebGo = new Promise(resolve => {
	resolve(
		sauce.match(/\d{1,6}/) || flag === "-g" ? require("./sites/nhentai.js")(sauce) :
		sauce.includes("joyhentai") || flag === "--joy" || sauce.match(/\d{7}o\d{6}/) ? require("./sites/joyhentai.js")(sauce) :
		sauce.includes("kissmanga") || flag === "--kiss" ? require("./sites/kissmanga.js")(sauce) :
		console.log("Invalid input")
	);
});

goWebGo.then(() => console.log("Courtesy, your friendly neighbourhood Spider-Man")).catch(console.log);