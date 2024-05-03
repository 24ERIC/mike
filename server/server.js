// server.js
const express = require('express');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

// Function to generate an image
const generateImage = (command) => {
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext('2d');

  // Basic example of drawing text
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(command, 50, 100);

  return canvas.toBuffer();
};

app.get('/generate-image', (req, res) => {
  const { command } = req.query;

  if (!command) {
    return res.status(400).json({ message: 'Missing command parameter' });
  }

  try {
    const imageBuffer = generateImage(command);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
