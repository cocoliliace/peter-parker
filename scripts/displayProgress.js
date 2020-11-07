module.exports = {
  exec(promises, length) {
    let progress = 0;
    promises.forEach((promise) => promise.then(() => {
      progress++;
      const ratioLength = Math.floor(process.stdout.columns / 2);
      const ratio = Math.floor(progress / promises.length * ratioLength);

      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${ progress }/${ promises.length } [${ "░".repeat(ratio) }${ "▭".repeat((ratioLength - ratio)) }]`);
    }));
  }
}