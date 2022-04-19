import getGeonames from './client/js/getGeonames.js';


import "./client/assets/images/Magome-Juku-Nakasendo-Trail.jpg";
import "./client/styles/exports.scss";


window.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', getGeonames);
});