const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');


app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//we need to store our geonames base url and api key from our .env file
// const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
// const geonamesApiKey = '&username=mark.jeffrey.rawlins';
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesApiKey = process.env.GEONAMES_API_KEY;


app.get('/*', (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});

//create a route that comes from the client side and sends a test result
app.post('/api', (req, res) => {
    console.log("req.body: ", req.body);
    const dataAPI = req.body;
    //we need to build the url using the base url and the api key
    const url = `${geonamesURL}${dataAPI.userInput}${geonamesApiKey}`;
    //we need to pull the data for confidence, irony, and agreement from the url
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //we need to grab confidence, irony, and agreement from the data
            const longitude = data.geonames[0].lng;
            const latitude = data.geonames[0].lat;

            //we need to store the data in our server 'database'
            let dataAPI = { longitude, latitude };

            console.log("data: ", dataAPI);
            res.send(dataAPI);
        });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
