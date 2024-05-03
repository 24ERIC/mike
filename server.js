const express = require('express');
const cors = require('cors');
const { Configuration, OpenAI } = require('openai');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());

// Serve the image
app.get('/api/image', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', '/client/src/a.png'));
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
