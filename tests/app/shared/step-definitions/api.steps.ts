/* eslint-disable no-underscore-dangle */
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { EnvironmentArranger } from '@microk/tests/domain/EnvironmentArranger';
import EnvironmentFixtures from '@microk/tests/domain/EnvironmentFixtures';
import assert from 'assert';
import request from 'supertest';
import App from '../../../../src/app/App';
import Container from '../../../../src/app/Container';

let _request: request.Test;
let _response: request.Response;
let application: App;

const environmentArranger: EnvironmentArranger = Container.get('Test.EnvironmentArranger');
const environmentFixtures: EnvironmentFixtures = Container.get('Test.EnvironmentFixtures');

BeforeAll(async () => {
    application = new App();
    await application.start();
    await environmentArranger.arrange()
    await environmentFixtures.loadFixtures()
});

AfterAll(async () => {
    await application.stop();
    await environmentArranger.close()
});

Given('I send a GET request to {string}', (route: string) => {
    _request = request(application.httpServer).get(route);
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer)
        .post(route)
        .send(JSON.parse(body));
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer)
        .put(route)
        .send(JSON.parse(body));
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
