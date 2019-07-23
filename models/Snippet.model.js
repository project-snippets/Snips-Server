/* eslint-disable no-console */

const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

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

/**
 * Inserts a new snippet into db.
 * @param {Snippet} newSnippet Data to create snippet
 * @returns {Promise<Snippet>} Created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw Error('Invalid arguments');
    // Read snippets.json
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // Grab data from new snippet & validate it
    // Push new snippet into snippets
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    // Write to file
    await fs.writeFile(dbpath, JSON.stringify(snippets));
    return snippets[snippets.length - 1];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Selects snippets from db.
 * Accepts optional query object to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} Array of snippet objects
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
    console.log('Error: Snippet select');
    throw err;
  }
};

/* Update */

/* Delete */
