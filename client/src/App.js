import React from 'react';
import UploadPdf from './components/UploadPdf';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Feeder</h1>
      </header>
      <main>
        <UploadPdf />
      </main>
    </div>
  );
}

export default App;
