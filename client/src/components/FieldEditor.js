import React, { useState } from 'react';
import './FieldEditor.css';

const FieldEditor = ({ pageNumber, onAddField, scale = 1 }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentField, setCurrentField] = useState(null);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    setStartPos({ x, y });
    setCurrentField({
      type: 'text',
      x,
      y,
      width: 0,
      height: 0,
      page: pageNumber
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    setCurrentField(prev => ({
      ...prev,
      width: Math.abs(x - startPos.x),
      height: Math.abs(y - startPos.y),
      x: Math.min(x, startPos.x),
      y: Math.min(y, startPos.y)
    }));
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    if (currentField.width > 10 && currentField.height > 10) {
      onAddField(currentField);
    }
    setCurrentField(null);
  };

  return (
    <div
      className="field-editor"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {currentField && (
        <div
          className="field-preview"
          style={{
            left: `${currentField.x * scale}px`,
            top: `${currentField.y * scale}px`,
            width: `${currentField.width * scale}px`,
            height: `${currentField.height * scale}px`
          }}
        />
      )}
    </div>
  );
};

export default FieldEditor; 