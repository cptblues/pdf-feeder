const request = require('supertest');
const app = require('../server');

describe('Test du serveur Express', () => {
  it('devrait répondre avec un message de statut', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
}); 