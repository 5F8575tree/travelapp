import getGeonames from './client/js/getGeonames.js';

import "../src/client/styles/main.css";


console.log('hello from index.js');


window.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', getGeonames); //! DO NOT ADD () AT THE END OF getGeonames
});