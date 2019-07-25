/* eslint-disable no-console */

const fs = require('fs').promises;
const path = require('path');

async function logger(request, response, next) {
  const logStr = `${request.method} ${request.path} ${Date.now()}\n`;
  const pathStr = path.join(__dirname, '..', 'log.txt');
  try {
    await fs.appendFile(pathStr, logStr);
    // console.log(logStr);
  } catch (err) {
    console.error(err);
  } finally {
    next(); // Moves on to the next piece of middleware
  }
}

module.exports = logger;
