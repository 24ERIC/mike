import React, { useState, useEffect } from 'react';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [gptText, setGptText] = useState('');

  useEffect(() => {
    fetch('/api/image')
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      });

    fetch('/api/gpt')
      .then(res => res.json())
      .then(data => setGptText(data));
  }, []);

  return (
    <div>
      <h1>Image and GPT</h1>
      <img src={imageSrc} alt='./a.png' />
      <p>{gptText}</p>
    </div>
  );
}

export default App;
