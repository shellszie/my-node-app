require('dotenv').config();
const axios = require('axios');
// Import the express module
const express = require('express');

// Initialize an Express app
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const api_key = process.env.GOOGLE_BOOKS_API_KEY;

app.use(cors());  // Allow all domains, or specify the origin if you want to limit access

// Define a route for the root URL
app.get('/api', (req, res) => {
  
  console.log("params for name=" + req.query.name);
  console.log("params for animal=" + req.query.animal);
  res.json({message: 'Hello from the API!'});
});

app.get('/googlebooks', async (req, res) => {
  
  let search = req.query.searchTerm;
  try {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${api_key}`)
      .then(response => {
        return res.send(response.data);      
      })
      } catch (error) {
        console.error(error.message);
      } 
});

app.get('/previewExists', async (req, res) => {
    let isbn = req.query.isbn;
  try {
    await axios.get(`https://books.google.com/books?jscmd=viewapi&bibkeys=ISBN:${isbn}`)
      .then(response => {
        if (response.data.includes("noview")) {
            return res.send(false);
        }
        else {
            return res.send(true);
        }
      })
      } catch (error) {
        console.error(error.message);
      }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});