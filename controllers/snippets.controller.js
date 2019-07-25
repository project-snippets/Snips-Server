const Snippet = require('../models/Snippet.model');

exports.createSnippet = async (request, response) => {
  // console.log(request.body);
  const newSnippet = await Snippet.insert(request.body);
  response.status(201).send(newSnippet);
};

exports.getAllSnippets = async (request, response) => {
  const snippets = await Snippet.select();
  return response.send(snippets);
};
