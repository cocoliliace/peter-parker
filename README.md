# Peter Parker
[![npm version](https://img.shields.io/npm/v/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![npm monthly downloads](https://img.shields.io/npm/dm/@chingchang9/peter-parker)](https://www.npmjs.com/package/@chingchang9/peter-parker)
[![Codecov coverage](https://img.shields.io/codecov/c/github/ChingChang9/peter-parker)](https://codecov.io/gh/ChingChang9/peter-parker)
[![code size](https://img.shields.io/github/languages/code-size/ChingChang9/peter-parker)](https://github.com/ChingChang9/peter-parker)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

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
```js
const sauce = require("@chingchang9/peter-parker");

sauce("177013", {
    outputDirectory: "./myFolder"
}).then(title => console.log(`Downloaded ${ title }`)); // Downloaded [ShindoLA] METAMORPHOSIS
```
Peter Parker supports way more sites, [listed below with their input format](#supported-sites).

## Installation
```bash
npm install -g @chingchang9/peter-parker
sauce config -o=/your/folder/path # if you want to download to a specific folder
```

#### The remaining of the installation is only necessary if you will be downloading from imgur.com
- #### I have Chrome or Chromium installed
  ```sh
  npm install puppeteer-core@13
  ```
  Then you need to write the path of your Chrome executable to Peter Parker's
  config.
  It defaults to a typical MacOS' path, so if you are on MacOS, you are likely
  already done.

  If you are getting errors, or are not on MacOS, you can first check your
  executable path by typing `chrome://version` in the address bar of your
  Chrome, then set the config with
  ```sh
  sauce config -e=/your/executable/path
  ```
  Check out [this StackOverflow post](https://stackoverflow.com/questions/17736215/universal-path-to-chrome-exe)
  if you need more help finding your executable path.

- #### I do NOT have Chrome or Chromium installed
  Go to the directory where Peter Parker is installed and run the following
  commands
  ```bash
  npm install puppeteer@13
  sauce config -e=
  ```

## Documentation
##### <code>sauce <_url_> [_option_ \<_value_\>]</code>
- Downloads the hentai at that url
- You may receive "Invalid input!" if the url is not from a [supported site](#supported-sites)

##### <code>sauce config [_option_][=_value_]</code>
- Sets the specified option to the specified value if `=` is present, or outputs
  the current value of the specified option otherwise
  - This value will be used as the default value for all future downloads
- Outputs the path of the config file if neither option nor value is present

##### Options
| Option (case insensitive) | What it is | Default value |
|:-------------------------:|:----------:|:-------------:|
| `--output`, `-o`, `--outputDirectory` | The location to save the hentai. Saves to the working directory if left empty | `""`
| `--execPath`, `-e`, `--executablePath` | The path to your Chrome/Chromium executable (only necessary if you are downloading from imgur) | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

##### `sauce`
- Sometimes a page might fail to download due to bad internet. When this
  happens, Peter Parker creates the pdf without that page, and a `temp` file
  storing the pages that failed. Running `sauce` without any arguments checks
  for the `temp` file and continues the download from where you left off
- Running this command when there is no temp file would terminate the program
  with a "No sauce given!" message
- If you would like to start on a new download and abort the failed download,
  you must delete the `temp` file, located in your specified output folder

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
