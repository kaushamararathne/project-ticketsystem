const express = require('express');
const pool = require('./src/db/db'); // our DB connection
require('dotenv').config();

const app = express();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Example: fetch all tickets
app.get('/tickets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ticket');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
