const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (request, response, next) => {
  // console.log(request.body);
  try {
    const newSnippet = await Snippet.insert(request.body);
    response.status(201).send(newSnippet);
  } catch (err) {
    next(err);
  }
};

exports.getAllSnippets = async ({ query }, response, next) => {
  try {
    const snippets = await Snippet.select(query);
    return response.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.getSnippetById = async ({ params: { id } }, response, next) => {
  try {
    // console.log(id);
    const snippet = await Snippet.select({ id });
    if (!snippet.length) {
      throw new ErrorWithHttpStatus('ID does not exist', 404);
    }
    response.send(snippet[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateSnipById = async (request, response, next) => {
  try {
    const updatedSnip = await Snippet.update(request.params, request.body);
    response.send(updatedSnip);
  } catch (err) {
    next(err);
  }
};

exports.deleteSnipById = async ({ params: { id } }, response, next) => {
  try {
    await Snippet.delete({ id });
    response.send(`Snippet "${id}" deleted successfully`);
  } catch (err) {
    next(err);
  }
};
