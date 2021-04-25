const sauce = process.argv[2];
const flag = process.argv[3] || "";

if (!sauce) return;

const goWebGo = new Promise(resolve => {
	resolve(
		!isNaN(sauce) || flag === "-g" ? require("./sites/nhentai.js")(sauce) :
		sauce.includes("kissmanga") || flag === "--kiss" ? require("./sites/kissmanga.js")(sauce) :
		console.log("Invalid input")
	);
});

goWebGo.then(() => console.log("Courtesy, your friendly neighbourhood Spider-Man")).catch(error => console.log(error));