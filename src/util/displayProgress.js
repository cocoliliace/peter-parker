const readline = require("readline");

module.exports = promises => {
	let progress = 0;
	promises.forEach(promise => promise.then(() => {
		progress++;
		const ratioLength = Math.floor(process.stdout.columns / 2);
		const ratio = Math.floor(progress / promises.length * ratioLength);

		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(`${ progress }/${ promises.length } [${ "🕸".repeat(Math.max(ratio - 1, 0)) }🕷${ " ".repeat(ratioLength - ratio) }]`);
	}));
};
