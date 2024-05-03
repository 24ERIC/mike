import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [mermaidCode, setMermaidCode] = useState('flowchart TD; A-->B; B-->C; C-->D;');
  const [chartImage, setChartImage] = useState('');

  const handleGenerateChart = async () => {
    const response = await fetch('http://localhost:5001/generate-chart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mermaidCode }),
    });
    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    setChartImage(imageUrl);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <textarea 
          value={mermaidCode} 
          onChange={e => setMermaidCode(e.target.value)}
        />
        <button onClick={handleGenerateChart}>Generate Chart</button>
        {chartImage && <img src={chartImage} alt="Generated Chart" />}
      </header>
    </div>
  );
}

export default App;
