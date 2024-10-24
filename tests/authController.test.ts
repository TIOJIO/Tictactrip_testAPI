import request from 'supertest';
import app from '../src/app'; // Assure-toi que le chemin vers `app` est correct

describe('POST /api/token', () => {
  it('should generate a token and display it in the console', async () => {
    const response = await request(app)
      .post('/api/token')
     .send({ email: 'foo@bar.com'});

    // Vérifie que le statut de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie que le token est présent dans la réponse
    const token = response.body.token;
    expect(token).toBeDefined();

    // Affiche le token dans la console
    console.log('Generated Token:', token);
  });
});
