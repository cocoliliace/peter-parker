# Peter Parker
With great power comes great hentai! Peter Parker is a powerful web-crawler that sources your favourite hentai and downloads them as PDFs!

## Installation & Usage
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
npm install

# To download g/177013
node . 177013

# To download g/4429 (don't actually download this)
node . 4429 -g

# To download Ishigami x Iino fancomics
node . https://kissmanga.org/manga/tq922018
# or
node . tq922018 --kiss
```

## How to use?
Simply run `index.js` with an input in the format specified in the table below, and get ready to shoot your webs!

SITE | INPUT | FLAG
-|-|-
HENTAICAFE | SITE REMOVED | --cafe
HENTAINEXUS | SITE REMOVED | --hn
KISSMANGA | <span>https://</span>kissmanga.org/manga/MANGA_NAME | -kiss
NHENTAI | XXXXXX | -g

Note: You can also use the unique identifier of each hentai/manga (the number or the manga name at the end of the url) to reference all of these site, as long as you pass in the flag to indicate the site.