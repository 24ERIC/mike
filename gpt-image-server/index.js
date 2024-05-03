const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/get-image', async (req, res) => {
    try {
        // Example GPT API Endpoint (Replace with real one)
        const gptApiUrl = 'https://api.example.com/generate-image';
        const response = await axios.post(gptApiUrl, {
            prompt: 'Generate an image'
        });
        
        // Assuming the API returns a base64 encoded image
        res.json({ image: response.data.image });
    } catch (error) {
        console.error('Error fetching image from GPT:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
