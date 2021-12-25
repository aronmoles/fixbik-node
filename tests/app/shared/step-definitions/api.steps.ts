/* eslint-disable no-underscore-dangle */
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import App from '../../../../src/app/App';

let _request: request.Test;
let _response: request.Response;
let application: App;

Given('I send a GET request to {string}', (route: string) => {
    _request = request(application.httpServer).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer).put(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Then('the response should be empty', () => {
    assert.deepEqual(_response.body, {});
});

Then('the response content should be:', (response) => {
    assert.deepEqual(_response.body, JSON.parse(response));
});

BeforeAll(async () => {
    application = new App();
    await application.start();
});

AfterAll(async () => {
    await application.stop();
});
