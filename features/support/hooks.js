require('dotenv').config();
const pactum = require('pactum');
const request = pactum.request;
const { Before } = require('@cucumber/cucumber');

Before(() => {
    request.setBaseUrl(process.env.BASE_URL);
});