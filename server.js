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
  res.sendFile(path.join(__dirname, 'images', 'a.png'));
});

// GPT schema and route
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAI(configuration);

app.get('/api/gpt', async (req, res) => {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: 'Describe the image a.png',
  });
  res.json(response.choices[0].text);
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
