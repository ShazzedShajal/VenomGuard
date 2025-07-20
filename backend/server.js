const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config(); // Loads variables from .env file

const app = express();
const port = 5001; // Choose a port for your backend

app.use(cors());
app.use(express.json());

// Set up multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the API endpoint
// It will be a POST request at /api/upload
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided.' });
    }

    try {
        // Your Roboflow model details
        // Get these from the "Deploy" tab of your Roboflow project
        const modelEndpoint = 'snakes-in-bangladesh-svd3l/3'; // e.g., "my-project/1"
        const apiKey = process.env.ROBOFLOW_API_KEY;

        // Convert the image buffer to a base64 string
        const imageBase64 = req.file.buffer.toString('base64');

        // Make the request to the Roboflow API
        const response = await axios({
            method: 'POST',
            url: `https://detect.roboflow.com/${modelEndpoint}`,
            params: {
                api_key: apiKey,
            },
            data: imageBase64,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Send Roboflow's prediction back to the React client
        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get prediction from Roboflow.' });
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});