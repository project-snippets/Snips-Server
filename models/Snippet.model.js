/* eslint-disable no-console */

const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/* Create */

/**
 * Selects snippets from db.
 * Accepts optional query object to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>}
 */
exports.select = async (query = {}) => {
  try {
    // Read & parse file
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // Filter snippets with query
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // Return data
    return filtered;
  } catch (err) {
    console.log('Error in Snippet model');
    throw err;
  }
};

/* Update */

/* Delete */
