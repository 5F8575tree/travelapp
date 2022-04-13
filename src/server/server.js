// const dotenv = require('dotenv');
// dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//we need to store our geonames base url and api key from our .env file
// const geonamesBaseUrl = process.env.GEONAMES_BASE_URL;
// const geonamesApiKey = process.env.GEONAMES_API_KEY;

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});

//create a route that comes from the client side and sends a test result
app.post('/api', (req, res) => {
    console.log("api listening");
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
