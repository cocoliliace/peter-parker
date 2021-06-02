# Peter Parker
With great power comes great hentai! Peter Parker is a powerful web-crawler that
sources your favourite hentai and downloads them as PDFs!

## Installation
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
mkdir responsibility # Your hentai will be saved here
npm install
npm install user-agents@latest # (OPTIONAL) Keeps the simulated user agents up-to-date
```
#### The remaining of the installation is only necessary if you will be downloading from imgur.com
- #### I have Chrome or Chromium installed
	Set the executable path on line 5 of `./sites/imgur.js` to your local path.
	It defaults to MacOS' settings, so if you are on MacOS, you can likely skip
	this step.
	If you are getting errors, or are not on MacOS, you can get your executable
	path by typing `chrome://version` in the address bar of your
	Chrome/Chromium, or [refer to this StackOverflow post for more assistance](https://stackoverflow.com/questions/17736215/universal-path-to-chrome-exe).

- #### I do NOT have Chrome or Chromium installed
	Run the following commands
	```bash
	npm uninstall puppeteer-core
	npm install puppeteer
	```
	then change the first line of `./sites/imgur.js` to
	```js
	const puppeteer = require("puppeteer");
	```
	Finally, remove _executablePath_ on line 5 of the same file so line 4 to 6 become
	```js
	const browser = await puppeteer.launch();
	```
## Example usages
```bash
# To download g/177013
node . 177013
# or
node . https://nhentai.net/g/177013

# To download Ishigami x Iino fancomics
node . https://kissmanga.org/manga/tq922018
```

Peter Parker supports way more sites, listed below with their input format.
Simply run `index.js` with an acceptable input format, and get ready to shoot your webs!

SITE | INPUT
:-:|:-:
9hentai | <span>https://</span>9hentai.to/g/**NUMBER**/
e-hentai | <span>https://</span>e-hentai.org/g/**UNIQUE_ID**/**UNIQUE_ID**
hentai2read | <span>https://</span>hentai2read.com/**HENTAI_NAME**<br />(only works for single-chapter hentai)
hentaimimi | <span>https://</span>hentaimimi.com/view/**UNIQUE_ID**
imgur | <span>https://</span>imgur.com/a/**UNIQUE_ID**<br /><span>https://<span />imgur.com/gallery/**UNIQUE_ID**
joyhentai | <span>https://</span>joyhentai.com/detail/**XXXXXXXoXXXXXX**.html
kissmanga | <span>https://</span>kissmanga.org/manga/**MANGA_NAME**
nhentai | any number of 1 to 6 digits<br /><span>https://</span>nhentai.net/g/**NUMBER**
hentaicafe | SITE REMOVED
hentainexus | SITE REMOVED
