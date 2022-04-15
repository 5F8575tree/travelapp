//we need an event listener that sends the input to the server when the user clicks the button
import { formatDate } from './formatDates';
import { post } from './post';
import validInput from './validInput';

const formHandler = async (evt) => {
    evt.preventDefault();

    const userInput = document.getElementById('input').value;
    const tripDate = document.getElementById('date').value;

    if (validInput(input)) {
        post('http://localhost:3001/api', { userInput, tripDate }).then(data => {
            console.log('longitude: ', data.longitude, 'latitude: ', data.latitude);
            document.getElementById('city').innerHTML = `City: ${userInput}`;
            document.getElementById('long').innerHTML = `Longitude: ${data.longitude}`;
            document.getElementById('lat').innerHTML = `Latitude: ${data.latitude}`;
            document.getElementById('weather').innerHTML = `Weather: ${data.weather}`;
            document.getElementById('temperature').innerHTML = `Temperature: ${data.temp}`;

            //take today's date and subtract the trip date
            const today = new Date();
            formatDate(today);
            const futureDate = new Date(tripDate);
            formatDate(futureDate);
            const diff = Math.abs(today - futureDate);
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            console.log('diffDays: ', diffDays);
            document.getElementById('days').innerHTML = `Days until your trip: ${diffDays}`;
        });
    } else {
        alert('Please enter a city name');
    }
}

export default formHandler;