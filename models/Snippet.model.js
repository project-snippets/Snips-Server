/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */

const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');

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
    const snippets = await readJsonFromDb('snippets');
    // Grab (validated) data from new snippet
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
    await writeJsonToDb('snippets', JSON.stringify(snippets));
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
    const snippets = await readJsonFromDb('snippets');
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
exports.update = async (id, newData) => {
  try {
    // Read in file
    const snippets = await readJsonFromDb('snippets');
    // Find snippet with id
    // Update snippet with (validated) newData
    const updated = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;
      Object.keys(newData).forEach(key => {
        if (key in snippet) snippet[key] = newData[key];
      });
      return snippet;
    });
    // Overwrite existing data
    return writeJsonToDb('snippets', JSON.stringify(updated));
  } catch (err) {
    console.log('Error: Snippet update');
    throw err;
  }
};

/**
 * Deletes a specified snippet from the db.
 * @param {string} id Unique snippet identifier
 */
exports.delete = async id => {
  try {
    // Read in database
    const snippets = await readJsonFromDb('snippets');
    // Filter results
    const filtered = snippets.filter(snippet => snippet.id !== id);
    // Write file
    if (filtered.length === snippets.length) return;
    return writeJsonToDb('snippets', JSON.stringify(filtered));
  } catch (err) {
    console.log('Error: Snippet delete');
    throw err;
  }
};
