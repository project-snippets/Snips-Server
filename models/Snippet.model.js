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
    let tempString = ``;
    Object.keys(newData).forEach(key => {
      tempString = tempString.concat(key) + ' = ' + `'${newData[key]}'` + ', ';
    });
    console.log('Before Slice', tempString);
    const finalString = tempString.slice(0, tempString.length - 2);
    console.log('After Slice', finalString);
    await db.query(`UPDATE snippet SET ${finalString} WHERE id = '${id}'`);
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
