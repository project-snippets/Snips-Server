const Snippet = require('./models/Snippet.model.js');

async function testModels() {
  // const snippets = await Snippet.select({
  //   author: 'Scott',
  //   language: 'javascript',
  // });
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'CJ',
      code: 'code code code',
      title: 'test.js',
      description: 'This works great!',
      language: 'javascript',
    });
    console.log(newSnippet);
  } catch (err) {
    console.error(err);
  }
}

testModels();
