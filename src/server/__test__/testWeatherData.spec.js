/**
 * @jest-environment jsdom
 */

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

//we need to test if the get route is defined
test('get is defined', () => {
    expect(app.get).toBeDefined();
});