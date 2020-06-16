const app = require('../src/app');

describe('App', () => {
  it('GET / responds with ok: true"', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  });
});