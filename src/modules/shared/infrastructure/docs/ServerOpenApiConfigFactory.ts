import * as packageJson from './../../../../../package.json';
import { ServerOpenApiConfig } from '../../../../microk/core/domain/Server';

export default class ServerOpenApiConfigFactory {
    static createConfig(): ServerOpenApiConfig {
        return ({
            baseDir: __dirname,
            filesPattern: [
                './../../../**/*.ts',
                './../../../../microk/**/domain/**/*.ts',
                './../../../../microk/event/infrastructure/**/*.ts',
            ],
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
