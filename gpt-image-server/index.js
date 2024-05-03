const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/get-image', async (req, res) => {
    res.sendFile(path.join(__dirname, 'a.png'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

