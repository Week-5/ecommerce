const routes = require('../routes/Homepage');
const request = require('supertest');
const app = require('../app')
const router = require('../routes/Homepage')

app.use('/homepage', router)

describe('Testing if routes work', () => {
    test('test root path', () => {
      request(app)
      .get('/homepage/Big Danny')
      .then(response => {
          expect(response.statusCode).toBe(200);
      });
    });
});