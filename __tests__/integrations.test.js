require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');
const db = require('../db/index');

beforeAll(async () => {
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', () => {
  describe('GET /api/snips', () => {
    it('should get all of the snips', async () => {
      const response = await request(app).get('/api/snippets');
      // expect two rows
      expect(response.body.length).toBe(3);
      // no errors
      expect(response.error).toBeFalsy();
      // expect status code 200
      expect(response.status).toBe(200);
      // matches data directly
      expect(response.body).toMatchSnapshot();
    });
  });
});

// cleanup
afterAll(() => {
  db.end();
});
