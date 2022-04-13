const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
