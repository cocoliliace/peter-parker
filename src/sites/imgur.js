const downloadImage = require("../util/downloadImage.js");

module.exports = async (url, executablePath) => {
  const browser = executablePath ? require("puppeteer-core").launch({ executablePath })
                                 : require("puppeteer").launch();
	const page = await browser.newPage();
	await page.setViewport({
		width: 1200,
		height: 99999
	});
	await page.goto(url);
	await page.click(".btn-wall--yes").catch(() => {});
	await page.click("button.loadMore").catch(() => {});
	return await Promise.all([
		page.title().then(title => {
			if (title === "Imgur: The magic of the Internet") throw "Sauce not found!";
			return title;
		}),
		page.$$eval(".image-placeholder", els => els.map(el =>
			el.getAttribute("src").replace(/(_d)?\.[a-zA-Z]{3,4}\?.+$/,
				".jpg?width=9999")))
	]).then(results => {
		browser.close();
		const promises = results[1].map(url => downloadImage(url).catch(console.log));
		return [promises, results[0].slice(0, -8), url];
	});
};
