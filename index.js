require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const api_key = process.env.GOOGLE_BOOKS_API_KEY;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Define a route for the root URL
app.get('/api', (req, res) => {
    console.log("params for name=" + req.query.name);
    console.log("params for animal=" + req.query.animal);
    res.json({message: 'Hello from the API!'});
});

app.get('/googlebooks', async (req, res) => {
    let search = req.query.searchTerm;
    try {
        console.log("api key = " + api_key);
        let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${api_key}&maxResults=40`);
        console.log("response = " + response);
        res.send(response.data);
    }
    catch (error) {
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
                } else {
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