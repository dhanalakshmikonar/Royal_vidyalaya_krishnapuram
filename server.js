require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // serve static files like index.html
app.use(express.json()); // parse JSON body

// POST route to send message to external API
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/chat`, // ✅ Use your actual deployed API
      { message: userMessage },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data); // send back response from external API
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Chatbot API request failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
