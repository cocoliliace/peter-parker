# Peter Parker
[![npm version](https://img.shields.io/npm/v/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![npm total downloads](https://img.shields.io/npm/dt/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![Codecov coverage](https://img.shields.io/codecov/c/github/ChingChang9/peter-parker)](https://codecov.io/gh/ChingChang9/peter-parker)
![david dependencies](https://img.shields.io/david/ChingChang9/peter-parker)
[![code size](https://img.shields.io/github/languages/code-size/ChingChang9/peter-parker)](https://github.com/ChingChang9/peter-parker)

With great power comes great hentai! Peter Parker is a powerful and lightweight
hentai downloader that offers speed, simplicity, and versatility!

## Example usages
### In command line
```bash
# To download g/177013
sauce 177013
# or
sauce https://nhentai.net/g/177013

# To download Ishigami x Iino fancomics
sauce https://kissmanga.org/manga/tq922018
```
### In code
UPDATE: Currently unstable. Use with caution and check back in a few days
```js
const sauce = require("@chingchang9/peter-parker");

sauce("177013", {
    outputFolderPath: "./myFolder"
}).then(title => console.log(`Downloaded ${ title }`)); // Downloaded [ShindoLA] METAMORPHOSIS
```
Peter Parker supports way more sites, [listed below with their input format](#supported-sites).

## Installation
```bash
npm install -g @chingchang9/peter-parker
sauce config o=/your/folder/path
```
#### The remaining of the installation is only necessary if you will be downloading from imgur.com
- #### I have Chrome or Chromium installed
	Set the executable path to your local path.
	It defaults to a typical MacOS' path, so if you are on MacOS, you can likely
	skip this step.

	If you are getting errors, or are not on MacOS, you can first check your
	executable path by typing `chrome://version` in the address bar of your
	Chrome/Chromium, then set it with `sauce config e=/your/executable/path`.
	Check out [this StackOverflow post if you need more help getting finding your
	executable path](https://stackoverflow.com/questions/17736215/universal-path-to-chrome-exe).

- #### I do NOT have Chrome or Chromium installed
	**UPDATE: This process is a bit complicated and an alternative method will be coming soon. In the mean time please feel free to [give me suggestions of how it should be done](https://github.com/ChingChang9/peter-parker/issues), or [implement it yourself](https://github.com/ChingChang9/peter-parker/pulls).**

	Go into the source code of peter-parker and run the following commands
	```bash
	npm uninstall puppeteer-core
	npm install puppeteer
	```
	then change the first line of `./src/sites/imgur.js` to
	```js
	const puppeteer = require("puppeteer");
	```
	Finally, change line 5 of the same file to
	```js
	const browser = await puppeteer.launch();
	```
## Documentation
### Using in command line
##### `sauce <url>` where `<url>` is a valid url
- Download the hentai on that url
- If you receive "Invalid input!", check that the url is in one of the [input
  formats specified under the supported sites](#supported-sites)

##### `sauce`
- Sometimes a page might fail to download due to bad internet. When this
  happens, peter-parker creates the pdf without that page, and a temp file
  storing the pages that failed. Running `sauce` without any arguments checks
  for the temp file and continues the download from where you left off
- Running this command when there is no temp file would terminate the program
  with a "No sauce given!" message
- If you would like to start on a new download and abort the failed download,
  you must delete the temp file, located in your specified output folder

##### `sauce config`
- Get the path of the config file. You should not be editing this file manually. See the commands below for how to edit it

##### `sauce config outputFolderPath`
- Get the value of `outputFilePath` in config
- **Default**: No default value, which means you must set one the first time you
install the package
- **Aliases**: `outputFolder`, `outputPath`, `output`, and `o`. Case insensitive

##### `sauce config outputFolderPath=/your/folder/path`
- Set the value of `outputFolderPath` in config
- **Aliases**: Same as above

##### `sauce config executablePath`
- Get the value of `executablePath` in config
- **Default**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Aliases**: `executablePath`, `executable`, `execPath`, `exec`, and `e`. Case
insensitive

##### `sauce config executablePath=/your/executable/path`
- Set the value of `executablePath` in config
- **Aliases**: Same as above

### Using in code
Documentation in progress! In the mean time, you can [reach out to me](https://github.com/ChingChang9/peter-parker/discussions)
for specific questions :)

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

## License
ISC
