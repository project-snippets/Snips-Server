/* eslint-disable no-prototype-builtins */

const shortid = require('shortid');
const db = require('../db');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

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
exports.insert = async ({ id, author, code, title, description, language }) => {
  try {
    await db.query(
      `INSERT INTO snippet VALUES ('${id}', '${code}', '${title}', '${description}', '0', '${author}', '${language}')`
    );
    // INSERT INTO snippet VALUES ('4', 'SomeCode', 'SomeTest', 'SomeDesc', '1', 'SomeAuthor', 'SomeLanguage');

    // if (!author || !code || !title || !description || !language)
    //   throw new ErrorWithHttpStatus('Invalid snip properties', 400);
    // // Read snippets.json
    // const snippets = await readJsonFromDb('snippets');
    // // Grab (validated) data from new snippet
    // // Push new snippet into snippets
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0
    // });
    // // Write to file
    // await writeJsonToDb('snippets', JSON.stringify(snippets));
    // return snippets[snippets.length - 1];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
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
    const result = await db.query('SELECT * FROM snippet');
    return result.rows;
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Updates snippet at specified id with new data
 * @returns Updated snippet
 */
exports.update = async ({ id }, newData) => {
  try {
    console.log(newData);
    console.log(id);
    let tempString = ``;
    Object.keys(newData).forEach(key => {
      tempString =
        tempString.concat(key) + ' = ' + `'${tempString.concat(newData[key])}'`;
    });
    console.log('tempString', tempString);
    await db.query(`UPDATE snippet SET ${tempString} WHERE id = '${id}'`);
    // let updatedSnip = {};
    // let idFound = false;
    // // Read in file
    // const snippets = await readJsonFromDb('snippets');
    // // Find snippet with id
    // // Update snippet with (validated) newData
    // const updated = snippets.map(snippet => {
    //   if (snippet.id !== id) return snippet;
    //   Object.keys(newData).forEach(key => {
    //     if (key in snippet) snippet[key] = newData[key];
    //     else throw new ErrorWithHttpStatus(`Key "${key}" does not exist`, 400);
    //   });
    //   updatedSnip = snippet;
    //   idFound = true;
    //   return snippet;
    // });
    // if (!idFound) {
    //   throw new ErrorWithHttpStatus('ID does not exist', 404);
    // }
    // // Overwrite existing data
    // await writeJsonToDb('snippets', JSON.stringify(updated));
    // return updatedSnip;
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Deletes a specified snippet from the db.
 * @param {string} id Unique snippet identifier
 */
exports.delete = async ({ id }) => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    if (result.rowCount === 0)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404); // short circuit if id not found
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};
