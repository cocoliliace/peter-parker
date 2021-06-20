module.exports = promises => {
	let progress = 0;
	promises.forEach(promise => promise.then(() => {
		progress++;
		const ratioLength = Math.floor(process.stdout.columns / 2);
		const ratio = Math.floor(progress / promises.length * ratioLength);

		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(`${ progress }/${ promises.length } [${ "🕸".repeat(Math.max(ratio - 1, 0)) }🕷${ " ".repeat(ratioLength - ratio) }]`);
	}));
};
