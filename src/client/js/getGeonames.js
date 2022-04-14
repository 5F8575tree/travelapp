//we need an event listener that sends the input to the server when the user clicks the button
import validInput from './validInput';
const fetch = require('node-fetch');

const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
}

const formHandler = async (evt) => {
    evt.preventDefault();

    const userInput = document.getElementById('input').value;
    if (validInput(input)) {
        post('http://localhost:3001/api', { userInput }).then(data => {
            console.log('longitude: ', data.longitude, 'latitude: ', data.latitude);
            document.getElementById('city').innerHTML = `City: ${userInput}`;
            document.getElementById('long').innerHTML = `Longitude: ${data.longitude}`;
            document.getElementById('lat').innerHTML = `Latitude: ${data.latitude}`;
        })
    } else {
        alert('Please enter a city name');
    }
}

export default formHandler;