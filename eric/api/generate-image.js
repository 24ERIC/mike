// api/generate-image.js
const { createCanvas } = require('canvas');

const generateImage = (command) => {
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext('2d');

  // Example of drawing text
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(command, 50, 100);

  return canvas.toBuffer();
};

export default (req, res) => {
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
};
