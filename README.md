# Peter Parker
With great power comes great hentai! Peter Parker is a powerful web-crawler that sources your favourite hentai and downloads them as PDFs!

## How to use?
Simply run index.js with an input in the format specified in the table below, and get ready to shoot your webs!

SITE | INPUT | FLAG
-|-|-
HENTAICAFE | https://hentai.cafe/manga/read/NAME_OF_HENTAI/en/0/1/page/ | --cafe
HENTAINEXUS | XXXX | --hn
KISSMANGA  | https://kissmanga.org/chapter/NAME_OF_MANGA/chapter_
NHENTAI | XXXXXX | -g

Note: You can also use numbers to reference all of these site. The flags are only required if the input does not match the default input format in the table.

## Usage
```bash
git clone https://github.com/ChingChang9/peter-parker.git
cd peter-parker
npm install

# To download g/177013
node . 177013

# To download g/4429 (don't actually download this)
node . 4429 -g

# To download https://hentai.cafe/hc.fyi/15161
node . https://hentai.cafe/manga/read/tamazatou-love-beats/en/0/1/page/

# Or
node . 15161 --cafe
```