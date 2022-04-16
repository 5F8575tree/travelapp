import getGeonames from './client/js/getGeonames.js';
import "./client/assets/images/Magome-Juku-Nakasendo-Trail.jpg";

import "../src/client/styles/main.css";

console.log('hello from index.js');


window.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', getGeonames);
});