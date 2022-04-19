const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');


app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//we need to store our data from our .env file
const geonamesURL = process.env.GEONAMES_BASE_URL;
const geonamesApiKey = process.env.GEONAMES_API_KEY;

const weatherURL = process.env.WEATHERBIT_BASE_URL;
const weatherApiKey = process.env.WEATHERBIT_API_KEY;

const pixabayURL = process.env.PIXABAY_BASE_URL;
const pixabayApiKey = process.env.PIXABAY_API_KEY;


app.get('/*', (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});

//create a route that comes from the client side and sends a test result
app.post('/api', (req, res) => {
    const dataAPI = req.body;
    const date = req.body.tripDate;

    //we need to build the url using the base url and the api key
    const url = `${geonamesURL}${dataAPI.userInput}${geonamesApiKey}`;

    //we need to pull the data for confidence, irony, and agreement from the url
    fetch(url)
        .then(res => res.json())
        .then(data => {

            //we need to grab confidence, irony, and agreement from the data
            const longitude = data.geonames[0].lng;
            const latitude = data.geonames[0].lat;

            //use above data to build weather url
            const urlWeather = `${weatherURL}&lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}${weatherApiKey}`;

            //we need to grab the weather data from the weatherbit url
            fetch(urlWeather)
                .then(res => res.json())
                .then(data => {

                    //we need the datetime from the api array to match the date from the client side and return the weather temp and humidity for that date
                    const weatherData = data.data.filter(item => {
                        return item.datetime.split('T')[0] === date;
                    });

                    //using the weather data we need to grab the required data fields
                    const temp = weatherData[0].temp;
                    const humidity = weatherData[0].rh;
                    const weatherDescription = weatherData[0].weather.description;
                    const weatherDate = weatherData[0].valid_date;
                    //we need the country code
                    const countryCode = data.country_code;

                    console.log("weatherbit code:", countryCode);

                    //we need to build the url for pixabay and return the image
                    const urlPixabay = `${pixabayURL}&q=${dataAPI.userInput}&image_type=photo&pretty=true&key=${pixabayApiKey}`;
                    fetch(urlPixabay)
                        .then(res => res.json())
                        .then(data => {

                            //we need to grab a random image from the array of images
                            const image = data.hits[Math.floor(Math.random() * data.hits.length)].webformatURL;

                            //we need to build the url for the country data
                            const urlCountry = `https://restcountries.com/v3.1/alpha/${countryCode}`;

                            console.log("url country is:", urlCountry);

                            //we need to send the data to the client side
                            fetch(urlCountry)
                                .then(res => res.json())
                                .then(data => {

                                    const country = data[0].name.common;
                                    const population = data[0].population;
                                    const region = data[0].region;
                                    const flag = data[0].flags.svg;

                                    console.log('country is', country, 'population is', population, 'region is', region, 'flag is', flag);

                                    res.send({
                                        dataAPI,
                                        longitude,
                                        latitude,
                                        temp,
                                        humidity,
                                        weatherDescription,
                                        weatherDate,
                                        image,
                                        country,
                                        population,
                                        flag,
                                        region
                                    });

                                });
                        });
                });
        });
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
