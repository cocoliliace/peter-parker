# Peter Parker
[![npm version](https://img.shields.io/npm/v/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![npm total downloads](https://img.shields.io/npm/dt/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
![david dependencies](https://img.shields.io/david/chingchang9/peter-parker)
[![code size](https://img.shields.io/github/languages/code-size/chingchang9/peter-parker)](https://github.com/ChingChang9/peter-parker)

With great power comes great hentai! Peter Parker is a powerful web-crawler that
sources your favourite hentai and downloads them as PDFs!

## Disclaimer
This project should only be used for saving copies of hentai that **you have
legal access to**, so you can read them offline. Theft of content and piracy are
not endorsed and we ask that you support the original content creators by
purchasing their works before saving them for offline with this project. We are
not responsible for your irresponsibility. Please don't disappoint Uncle Ben 🕷️

## Example usages
```bash
# To download g/177013
node . 177013
# or
node . https://nhentai.net/g/177013

# To download Ishigami x Iino fancomics
node . https://kissmanga.org/manga/tq922018
```
Peter Parker supports way more sites, [listed below with their input format](#supported-sites).
Simply run `index.js` with an acceptable input format, and get ready to shoot your webs!

## Installation
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
mkdir responsibility # Your hentai will be saved here
                     # If you want to save your hentai in a different place,
                     # edit the `folderPath` variable in `./config.json`
npm install
npm install user-agents@latest # (OPTIONAL) Keeps the simulated user agents up-to-date
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
- It is recommended that you make a command line alias to run this more easily:
  - i.e. Add `alias sauce='cd ~/path/to/peter-parker && node .'` to `~/.bashrc`
- Peter Parker has many responsibilities, but your misuses of this project is
  not one of them. Please make sure you've read the [disclaimer](#disclaimer)

## License
ISC
