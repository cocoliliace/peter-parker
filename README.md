# Peter Parker
With great power comes great hentai! Peter Parker is a powerful web-crawler that
sources your favourite hentai and downloads them as PDFs!

## Installation & Usage
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
mkdir responsibility # Your hentai will be saved here
npm install
npm install user-agents@latest # Keeps the simulated user agents up-to-date (optional)

# To download g/177013
node . 177013

# To download Ishigami x Iino fancomics
node . https://kissmanga.org/manga/tq922018
```

## How to use?
Simply run `index.js` with an input in the format specified in the table below,
and get ready to shoot your webs!

SITE | INPUT
:-:|:-:
9hentai | <span>https://</span>9hentai.to/g/**NUMBER**/
e-hentai | <span>https://</span>e-hentai.org/g/**UNIQUE_ID**/**UNIQUE_ID**
hentai2read | <span>https://</span>hentai2read.com/**HENTAI_NAME**<br />(only works for single-chapter hentai)
hentaimimi | <span>https://</span>hentaimimi.com/view/**UNIQUE_ID**
joyhentai | <span>https://</span>joyhentai.com/detail/**XXXXXXXoXXXXXX**.html
kissmanga | <span>https://</span>kissmanga.org/manga/**MANGA_NAME**
nhentai | any number of 1 to 6 digits<br /><span>https://</span>nhentai.net/g/**NUMBER**
hentaicafe | SITE REMOVED
hentainexus | SITE REMOVED
