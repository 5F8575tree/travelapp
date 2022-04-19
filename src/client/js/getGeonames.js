import { formatDate } from './formatDates';
import { post } from './post';
import validInput from './validInput';

const formHandler = async (evt) => {
    evt.preventDefault();

    const userInput = document.getElementById('input').value;
    const tripDate = document.getElementById('date').value;

    if (validInput(input)) {
        post('http://localhost:3001/api', { userInput, tripDate }).then(data => {

            document.getElementById('cityInput').innerHTML = ` ${userInput}`;
            document.getElementById('longitude').innerHTML = ` ${data.longitude}`;
            document.getElementById('latitude').innerHTML = ` ${data.latitude}`;
            document.getElementById('weather-description').innerHTML = ` ${data.weatherDescription}`;
            document.getElementById('temperature-description').innerHTML = ` ${data.temp}℃`;
            document.getElementById('humidity-description').innerHTML = ` ${data.humidity}%`;

            const population = data.population.toLocaleString("en-US");

            document.getElementById('country-name').innerHTML = `${userInput}, ${data.country}`;
            document.getElementById('population').innerHTML = `Population: ${population}`;
            document.getElementById('region').innerHTML = `Region: ${data.region}`;


            //show the date of travel in a readable format
            document.getElementById('travelDate').innerHTML = new Date(data.weatherDate).toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric' });


            //take today's date and subtract the trip date
            const today = new Date();
            formatDate(today);
            const futureDate = new Date(tripDate);
            formatDate(futureDate);
            const diff = Math.abs(today - futureDate);
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));


            //if the trip is more than one day away use 'days' in the sentence, if the trip is before today use 'incorrect'
            if (diffDays > 1) {
                document.getElementById('days').innerHTML = `Your trip to ${userInput} is in ${diffDays} days`;
            } else {
                document.getElementById('days').innerHTML = `Your trip to ${userInput} is tomorrow!!`;
            }


            //we need to insert the image from pixabay into the div entitled 'image'
            const image = document.getElementById('location');
            image.innerHTML = `<img class="photo" src="${data.image}" alt="${userInput}">`;

            const flag = document.getElementById('flag');
            flag.innerHTML = `<img class="flag-container" src="${data.flag}" alt="${data.country}">`;

        });
    } else {
        alert('Please enter a city name');
    }
}

export default formHandler;