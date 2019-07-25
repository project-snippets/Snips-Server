const express = require('express');
const Snippet = require('../models/Snippet.model');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/', (request, response) => {
  // console.log("We're in the router");
  response.send('Welcome to Snips!');
});

router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API!');
});

/* Snippet routes */

// POST /snippets
router.post('/api/snippets', snippets.createSnippet);

// GET /snippets
router.get('/api/snippets', snippets.getAllSnippets);

// GET /snippets/:id
router.get('/api/snippets/:id', (request, response) => {
  response.send('Got specific id');
});

// POST
router.post('/api/snippets', (request, response) => {
  response.send();
});

// UPDATE
router.patch('/api/snippets', (request, response) => {
  response.send('Updated');
});

module.exports = router;
