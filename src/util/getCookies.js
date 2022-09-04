const Database = require("better-sqlite3");
const fs = require("fs");
const { cookiesPath } = require("../../config.json");

module.exports = host => {
  fs.copyFile(cookiesPath, "/dev/shm/tmp.sqlite", handleError);

  let cookies = "";
  const db = new Database("/dev/shm/tmp.sqlite", { readonly: true });
  for (const { name, value } of db.prepare(`SELECT name, value FROM moz_cookies WHERE host LIKE '%${host}'`).iterate()) {
    cookies += `${name}=${value}; `;
  }

  fs.unlink("/dev/shm/tmp.sqlite", handleError);

  return cookies;
};

function handleError(error) {
  if (error) throw error;
}
