const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Route to serve the image
app.get('/get-image', (req, res) => {
    // Using __dirname to refer to the current directory
    const imagePath = path.join(__dirname, 'a.png');
    res.sendFile(imagePath);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
