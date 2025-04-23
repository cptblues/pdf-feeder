import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './PdfViewer.css';

// Configuration du worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

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
      </div>
      
      <div className="pdf-container">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Chargement du PDF...</div>}
          error={<div>Erreur lors du chargement du PDF</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer; 