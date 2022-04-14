//we need an event listener that sends the input to the server when the user clicks the button
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
            document.getElementById('tripDate').innerHTML = `Date: ${tripDate}`;
        })
    } else {
        alert('Please enter a city name');
    }
}

export default formHandler;