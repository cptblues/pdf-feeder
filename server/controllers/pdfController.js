const Pdf = require('../models/Pdf');
const fs = require('fs');
const path = require('path');

exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier n\'a été uploadé' });
    }

    const pdf = new Pdf({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size
    });

    await pdf.save();

    res.status(201).json({
      message: 'PDF uploadé avec succès',
      pdf: {
        id: pdf._id,
        filename: pdf.filename,
        originalName: pdf.originalName,
        size: pdf.size,
        uploadDate: pdf.uploadDate
      }
    });
  } catch (error) {
    // En cas d'erreur, supprimer le fichier uploadé
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Erreur lors de la suppression du fichier:', err);
      });
    }
    res.status(500).json({ error: 'Erreur lors de l\'upload du PDF' });
  }
}; 