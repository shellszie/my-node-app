// Import the express module
const express = require('express');

// Initialize an Express app
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());  // Allow all domains, or specify the origin if you want to limit access

// Define a route for the root URL
app.get('/api', (req, res) => {
  res.json({message: 'Hello from the API!'});
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});