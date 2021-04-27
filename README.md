# Peter Parker
With great power comes great hentai! Peter Parker is a powerful web-crawler that sources your favourite hentai and downloads them as PDFs!

## Installation & Usage
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
mkdir responsibility
npm install

# To download g/177013
node . 177013

# To download Ishigami x Iino fancomics
node . https://kissmanga.org/manga/tq922018
# or
node . tq922018 --kiss
```

## How to use?
Simply run `index.js` with an input in the format specified in the table below, and get ready to shoot your webs!

SITE | INPUT DESCRIPTION | FLAG
:-:|:-:|:-:
JOYHENTAI | 13 digit number separated by an "o" after the 7th digit (XXXXXXXoXXXXXX)<br /><span>https://</span>joyhentai.com/detail/XXXXXXXoXXXXXX.html | --joy
KISSMANGA | MANGA_NAME<br /><span>https://</span>kissmanga.org/manga/MANGA_NAME | --kiss
NHENTAI | any number of 1 to 6 digits | -g
HENTAICAFE | SITE REMOVED | --cafe
HENTAINEXUS | SITE REMOVED | --nexus

Note: If the input could be accepted by more than 1 site, you need to pass in the flag to indicate the site you want to download from