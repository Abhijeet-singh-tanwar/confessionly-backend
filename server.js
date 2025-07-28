// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'views', 'public')));

// Serve the HTML file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});
// Add this below the test route

app.post('/send-confession', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Name and message are required." });
  }

  // Just logging for now — later you can send an email, store in DB, etc.
  console.log(`Confession from ${name}: ${message}`);

  res.json({ success: true, message: "Confession received!" });
});


// Handle confession form submission (POST)
app.post('/confess', (req, res) => {
  const { to, from, message, theme, emoji } = req.body;

  console.log('New Confession Received:');
  console.log({ to, from, message, theme, emoji });

  // You can store it in a database or file later
  res.status(200).json({ success: true, message: 'Confession sent successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
