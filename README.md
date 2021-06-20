# Peter Parker
[![npm version](https://img.shields.io/npm/v/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![npm total downloads](https://img.shields.io/npm/dt/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
![david dependencies](https://img.shields.io/david/chingchang9/peter-parker)
[![code size](https://img.shields.io/github/languages/code-size/chingchang9/peter-parker)](https://github.com/ChingChang9/peter-parker)

With great power comes great hentai! Peter Parker is a powerful and lightweight
hentai downloader that offers speed, simplicity, and customization!

## Example usages
```bash
# To download g/177013
sauce 177013
# or
sauce https://nhentai.net/g/177013

# To download Ishigami x Iino fancomics
sauce https://kissmanga.org/manga/tq922018
```
Peter Parker supports way more sites, [listed below with their input format](#supported-sites).
Simply run `sauce` with an acceptable input format, and get ready to shoot your webs!

## Installation
```bash
npm install -g @chingchang9/peter-parker
sauce config o=/path/to/output/folder
```
#### The remaining of the installation is only necessary if you will be downloading from imgur.com
- #### I have Chrome or Chromium installed
	Set the executable path in `./config.json` to your local path.
	It defaults to a typical MacOS' path, so if you are on MacOS, you can likely
	skip this step.
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
	Finally, change line 5 of the same file to
	```js
	const browser = await puppeteer.launch();
	```
## Supported sites
SITE | INPUT FORMAT
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

## Additional notes
- If any page failed to download for any reason, peter-parker would create the
  pdf without that page, and a temp file storing the pages that failed. If this
  happens, don't panic! Just run peter-parker again when your internet is more
  stable and peter-parker will continue the download from where you left off.
  However, if you would like to start on a new download, you must delete the
  temp file, located in your specified output folder

## License
ISC
