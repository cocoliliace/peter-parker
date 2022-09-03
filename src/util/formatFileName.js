module.exports = fileName => fileName.replace(/^(\(.+?\)|comic) /i, "")
  .replace(/\.?((.)(\[|\{|\(comic).+?(\]|\}|\)))+$/i, "$2")
  .replace(/\].+\| /, "] ")
  .replace(/(^\[.+?\](?! ))/, "$1 ")
  .replace(/\//g, "∕").trim();
