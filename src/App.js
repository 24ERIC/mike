// ImageGenerator.js
import React, { useState } from 'react';

const ImageGenerator = () => {
  const [command, setCommand] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch(`http://mike-delta.vercel.app/generate-image?command=${encodeURIComponent(command)}`);
      if (!response.ok) throw new Error('Error generating image');
      
      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
