const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Set the path to the data.json file (in server/ folder)
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware to serve static files from the 'client' folder instead of 'public'
app.use(express.static(path.join(__dirname, '..', 'client'))); // Point to the 'client' folder

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// GET /items → Return the current list from data.json
app.get('/items', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const items = JSON.parse(data);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Could not read data file.' });
  }
});

// POST /items → Save a new list to data.json
app.post('/items', async (req, res) => {
  const newList = req.body;

  if (!Array.isArray(newList)) {
    return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
  }

  try {
    await fs.writeFile(dataFilePath, JSON.stringify(newList, null, 2));
    res.json(newList);
  } catch (err) {
    res.status(500).json({ error: 'Could not write to data file.' });
  }
});

// Serve the `index.html` file from the `client` folder when visiting the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html')); // Point to the 'client' folder
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
