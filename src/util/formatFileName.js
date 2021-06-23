module.exports = fileName => fileName.replace(/^\(.{1,16}\) /, "").replace(/\.?((.)(\[|\{|\(COMIC).{1,24}(\]|\}|\)))+$/, "$2").replace(/\].+\| /, "] ").trim();
