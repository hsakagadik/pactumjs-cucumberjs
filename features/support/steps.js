const { Given, When, Then, Before } = require('@cucumber/cucumber');
const pactum = require('pactum');
const request = pactum.request;
const fs = require('fs');
let spec;

Before(function (){
  spec = pactum.spec();
});

// --------------- //
//Background steps
// --------------- //

Given('that we set the default headers as {string}', function (headers) {
  request.setDefaultHeaders(JSON.parse(headers))
})

Given('that we set the default cookies as {string}', function (cookies) {
  spec.withHeaders(JSON.parse(cookies));
})

Given('that we set the default body as {string}', function (body) {
  spec.withBody(JSON.parse(body));
})

Given('that we set the default path as {string}', function (path) {
  spec.withPath(path);
})

Given('that we set the base url as {string}', function (url) {
  request.setBaseUrl(url);
})

Given('that we set the follow redirects as {word}', function (redirects) {
  request.setFollowRedirects(redirects);
})

// -------------- //
// Actions steps
// -------------- //

When('we do a {word} request to {string}', async function (method, endpoint) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  await spec.toss();
});

When('we do a {word} request to {string} with the {word} query param with {word} value', async function (method, endpoint, param, value) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withQueryParams(param, value);
  await spec.toss();
});

When('we do a {word} request to {string} with the {word} query params', async function (method, endpoint, params) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withQueryParams(JSON.parse(params));
  await spec.toss();
});

When('we do a {word} request to {string} with the headers as {string}', async function (method, endpoint, headers) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withHeaders(JSON.parse(headers));
  await spec.toss();
});

When('we do a {word} request to {string} with the cookies as {string}', async function (method, endpoint, cookies) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withCookies(JSON.parse(cookies));
  await spec.toss();
});

When('we do a {word} request to {string} with the body as {string}', async function (method, endpoint, body) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withBody(JSON.parse(body));
  await spec.toss();
});

When('we do a {word} request to {string} with the json as in {string}', async function (method, endpoint, jsonPath) {
  spec.withMethod(method);
  spec.withPath(endpoint);
  spec.withJson(jsonPath);
  await spec.toss();
});

// -------------------- //
// Expected outcome steps
// -------------------- //

Then('response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

// TODO: modify it should accept a json
Then('the header {string} should have the {string} value', function (header, value) {
  spec.response().should.have.headers(header, value);
});

Then('the header {string} should contains the {string} value', function (header, value) {
  spec.response().should.have.headerContains(header, value);
});

// TODO: modify it should accept a json
Then('the cookie {string} should have the {string} value', function (cookie, value) {
  spec.response().should.have.cookies(cookie, value);
});

Then('the cookie {string} should contains the {string} value', function (cookie, value) {
  spec.response().should.have.cookiesLike(cookie, value);
});

Then('the body of the response should be as {string}', function (body) {
  spec.response().should.have.body(JSON.parse(body));
});

Then('the body of the response should contain the {string} value', function (body) {
  spec.response().should.have.bodyContains(JSON.parse(body));
});

Then('the json of the response should be as {string}', function (jsonPath) {
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  spec.response().should.have.json(json);
});

Then('the json of the response should be like in {string}', function (jsonPath) {
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  spec.response().should.have.jsonLike(json);
});

Then('the {string} field of the json response should contain the {string} value', function (field, value) {
  spec.response().should.have.jsonLike(field, value);
});

Then('the json of the response should match with the {string} schema', function (schemaPath) {
  const json = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  spec.response().should.have.jsonSchema(json);
});

Then('the field {string} of the response should have a length of {int}', function (field, length) {
  spec.response().should.have.jsonLength(field, length);
});1