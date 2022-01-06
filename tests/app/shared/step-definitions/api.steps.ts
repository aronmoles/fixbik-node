/* eslint-disable no-underscore-dangle */
import { AfterAll, Before, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import FixBikApp from '../../../../src/app/FixBikApp';
import Container from '../../../../src/app/Container';
import { EnvironmentArranger } from '../../../../src/microk/tests/domain/EnvironmentArranger';
import EnvironmentFixtures from '../../../../src/microk/tests/domain/EnvironmentFixtures';
import { Keys } from '../../../../src/modules/shared/infrastructure/di/Keys';

let _request: request.Test;
let _response: request.Response;
let application: FixBikApp;

const environmentArranger: EnvironmentArranger = Container.get(Keys.Test.EnvironmentArranger);
const environmentFixtures: EnvironmentFixtures = Container.get(Keys.Test.EnvironmentFixtures);

BeforeAll(async () => {
    application = new FixBikApp();
    await application.start();
});

Before(async () => {
    await environmentArranger.arrange()
    await environmentFixtures.loadFixtures()
})

AfterAll(async () => {
    await environmentArranger.close()
    await application.stop();
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

Given('I send a DELETE request to {string}', (route: string) => {
    _request = request(application.httpServer).delete(route);
});

Given('I authenticate request with token {string}', (token: string) => {
    _request = _request.set('Authorization', `Bearer ${token}`);
});

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Then('the response should be empty', () => {
    assert.deepEqual(_response.body, {});
});

Then('the response content should be:', (response: string) => {
    assert.deepEqual(_response.body, JSON.parse(response));
});

Then('log response', () => {
    // eslint-disable-next-line no-console
    console.log('RESPONSE', _response.body);
});
