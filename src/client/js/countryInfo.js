const { post } = require("./post")

const getInfo = () => {
    document.getElementById('get-info').addEventListener('click', () => {
        const userInput = document.getElementById('user-input');

        post('http://localhost:3001/info', { userInput }).then(data => {
            document.getElementById('country-name').innerHTML = `${data.name}`;
            document.getElementById('population').innerHTML = `${data.population}`;
            document.getElementById('flag').innerHTML = `${data.flag}`;
            document.getElementById('currency').innerHTML = `${data.currency}`;
            document.getElementById('language').innerHTML = `${data.language}`;
        });
    });
}

export default getInfo;