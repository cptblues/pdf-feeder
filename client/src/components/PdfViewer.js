import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import FieldEditor from './FieldEditor';
import './PdfViewer.css';

// Configuration du worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl, pdfId }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [fields, setFields] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pdfId) {
      loadFields();
    }
  }, [pdfId]);

  const loadFields = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/pdfs/${pdfId}/fields`);
      setFields(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des champs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      if (newPageNumber < 1 || newPageNumber > numPages) {
        return prevPageNumber;
      }
      return newPageNumber;
    });
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const handleAddField = async (field) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/pdfs/${pdfId}/fields`, field);
      setFields(prev => [...prev, response.data.field]);
    } catch (err) {
      setError('Erreur lors de l\'ajout du champ');
      console.error(err);
    }
  };

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
        >
          Page précédente
        </button>
        <span>
          Page {pageNumber} sur {numPages}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
        >
          Page suivante
        </button>
        <button onClick={zoomOut}>-</button>
        <span>Zoom: {Math.round(scale * 100)}%</span>
        <button onClick={zoomIn}>+</button>
        <button
          onClick={toggleEditing}
          className={isEditing ? 'active' : ''}
        >
          {isEditing ? 'Arrêter l\'édition' : 'Ajouter des champs'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="pdf-container">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Chargement du PDF...</div>}
          error={<div>Erreur lors du chargement du PDF</div>}
        >
          <div className="page-container">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            {isEditing && (
              <FieldEditor
                pageNumber={pageNumber}
                onAddField={handleAddField}
                scale={scale}
              />
            )}
            {fields
              .filter(field => field.page === pageNumber)
              .map((field, index) => (
                <div
                  key={field._id || index}
                  className="field"
                  style={{
                    left: `${field.x * scale}px`,
                    top: `${field.y * scale}px`,
                    width: `${field.width * scale}px`,
                    height: `${field.height * scale}px`
                  }}
                />
              ))}
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer; 