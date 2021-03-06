import OpenApi from './index';

const expectedResponse = {
    openapi: '3.0.0',
    info: {
        title: 'Test',
        version: '1.0.0',
        description: 'Public API',
        license: {
            name: 'MIT',
        },
    },
    paths: {
        '/notification': {
            post: {
                operationId: 'addJob',
                tags: [
                    'jobs',
                ],
                summary: 'Creates a new notification.',
                description: '',
                security: [
                    {
                        jwt: [],
                    },
                ],
                requestBody: {
                    description: 'Notification object to create',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Notification',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Successful operation. The notification has been created on the server.',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad Request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            jwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    code: {
                        type: 'integer',
                        example: 404,
                    },
                },
            },
            Notification: {
                type: 'object',
                required: [
                    'serviceUrl',
                ],
                properties: {
                    serviceUrl: {
                        type: 'string',
                    },
                    authenticationHeader: {
                        type: 'string',
                    },
                    certificateSubject: {
                        type: 'string',
                    },
                    parameters: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

describe('OpenApi', () => {
    it('should create a valid auth token', () => {
        const openApi = new OpenApi({
            baseDir: __dirname,
            filesPattern: ['./examples/*.ts'],
            info: {
                title: 'Test',
                version: '1.0.0',
                description: 'Public API',
                license: {
                    name: 'MIT',
                },
            },
            components: {
                securitySchemes: {
                    jwt: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        })

        const openApiDoc = openApi.generateDocs();

        expect(openApiDoc).toEqual(expectedResponse)
    });
});
