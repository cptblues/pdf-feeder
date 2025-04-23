const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');
const Pdf = require('../models/Pdf');

describe('Upload de PDF', () => {
  // Créer un fichier PDF de test
  const testPdfPath = path.join(__dirname, 'test.pdf');
  beforeAll(() => {
    fs.writeFileSync(testPdfPath, 'PDF test content');
  });

  afterAll(() => {
    // Nettoyer les fichiers de test
    if (fs.existsSync(testPdfPath)) {
      fs.unlinkSync(testPdfPath);
    }
  });

  it('devrait refuser un fichier non-PDF', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('pdf', Buffer.from('not a pdf'), 'test.txt');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('devrait accepter et stocker un PDF valide', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('pdf', testPdfPath);

    expect(response.status).toBe(201);
    expect(response.body.pdf).toBeDefined();
    expect(response.body.pdf.filename).toBeDefined();
    expect(response.body.pdf.originalName).toBe('test.pdf');
  });

  it('devrait stocker les métadonnées du PDF dans MongoDB', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('pdf', testPdfPath);

    const pdf = await Pdf.findById(response.body.pdf.id);
    expect(pdf).toBeDefined();
    expect(pdf.filename).toBe(response.body.pdf.filename);
    expect(pdf.size).toBeGreaterThan(0);
  });
}); 