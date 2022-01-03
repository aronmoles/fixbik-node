import { ServerOpenApiConfig } from '../../../../app/Server';
import * as packageJson from './../../../../../package.json';

export default class ServerOpenApiConfigFactory {
    static createConfig(): ServerOpenApiConfig {
        return ({
            baseDir: __dirname,
            filesPattern: './../../../**/*.ts',
            swaggerUIPath: '/api-docs',
            apiDocsPath: '/api-docs.yaml',
            format: 'yaml',

            info: {
                version: packageJson.version,
                title: packageJson.name,
                description: packageJson.description,
                license: {
                    name: packageJson.license,
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
    }
}
