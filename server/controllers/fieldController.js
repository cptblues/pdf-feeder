const Field = require('../models/Field');

exports.addField = async (req, res) => {
  try {
    const field = new Field({
      ...req.body,
      pdfId: req.params.pdfId
    });

    await field.save();

    res.status(201).json({
      message: 'Champ ajouté avec succès',
      field
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du champ' });
  }
};

exports.getFields = async (req, res) => {
  try {
    const fields = await Field.find({ pdfId: req.params.pdfId });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des champs' });
  }
};

exports.updateField = async (req, res) => {
  try {
    const field = await Field.findByIdAndUpdate(
      req.params.fieldId,
      req.body,
      { new: true }
    );

    if (!field) {
      return res.status(404).json({ error: 'Champ non trouvé' });
    }

    res.json({
      message: 'Champ mis à jour avec succès',
      field
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du champ' });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.fieldId);

    if (!field) {
      return res.status(404).json({ error: 'Champ non trouvé' });
    }

    res.json({ message: 'Champ supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du champ' });
  }
}; 