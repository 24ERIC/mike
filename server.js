const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for ChatGPT interaction
app.use(cors({
  origin: 'https://chat.openai.com',
}));

// Endpoint to serve the image
app.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, 'a.png'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
