const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('./middleware/upload');
const pdfController = require('./controllers/pdfController');
const fieldController = require('./controllers/fieldController');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes de base pour tester le serveur
app.get('/', (req, res) => {
  res.json({ message: 'Serveur PDF Feeder en cours d\'exécution' });
});

// Routes pour les PDF
app.post('/api/upload', upload.single('pdf'), pdfController.uploadPdf);

// Routes pour les champs
app.post('/api/pdfs/:pdfId/fields', fieldController.addField);
app.get('/api/pdfs/:pdfId/fields', fieldController.getFields);
app.put('/api/fields/:fieldId', fieldController.updateField);
app.delete('/api/fields/:fieldId', fieldController.deleteField);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/pdf-feeder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app; // Pour les tests 