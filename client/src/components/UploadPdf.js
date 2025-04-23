import React, { useState } from 'react';
import axios from 'axios';
import PdfViewer from './PdfViewer';
import './UploadPdf.css';

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfId, setPdfId] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Veuillez sélectionner un fichier PDF valide');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner un fichier PDF');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('PDF uploadé avec succès !');
      setFile(null);
      // Construire l'URL du PDF à partir de la réponse
      const filename = response.data.pdf.filename;
      setPdfUrl(`http://localhost:5000/uploads/pdfs/${filename}`);
      setPdfId(response.data.pdf.id);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'upload du PDF');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload de PDF</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button
          type="submit"
          disabled={!file || uploading}
          className="upload-button"
        >
          {uploading ? 'Upload en cours...' : 'Uploader le PDF'}
        </button>
      </form>
      
      {pdfUrl && (
        <div className="pdf-preview">
          <h3>Prévisualisation du PDF</h3>
          <PdfViewer pdfUrl={pdfUrl} pdfId={pdfId} />
        </div>
      )}
    </div>
  );
};

export default UploadPdf; 