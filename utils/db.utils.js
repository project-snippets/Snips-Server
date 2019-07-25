const fs = require('fs').promises;
const path = require('path');

/**
 * Reads a json file from db.
 * @param {string} resource The filename to be read
 * @returns {Promise<Snippet[]>} Array of snippets
 */
exports.readJsonFromDb = async resource => {
  const dbpath = path.join(__dirname, '..', 'db', `${resource}.json`);
  return JSON.parse(await fs.readFile(dbpath));
};

/**
 * Writes content to a db file.
 * @param {string} resource File to be written
 * @param {string} content Content to write to the file
 * @returns {Promise<void>}
 */
exports.writeJsonToDb = async (resource, content) => {
  const dbpath = path.join(__dirname, '..', 'db', `${resource}.json`);
  return fs.writeFile(dbpath, content);
};
