import doctrine from 'doctrine';
import fs from 'fs';
import glob from 'glob';
import mergeWith from 'lodash.mergewith';
import { OpenAPIObject } from 'openapi3-ts';
import {
    ComponentsObject,
    ExternalDocumentationObject,
    InfoObject,
    PathsObject,
    SecurityRequirementObject,
    ServerObject,
    TagObject,
} from 'openapi3-ts/src/model/OpenApi';
import path from 'path';
import YAML from 'yaml';

export type OpenApiConfig = {
    baseDir: string,
    filesPattern: string,

    info: InfoObject;
    servers?: ServerObject[];
    paths?: PathsObject;
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
}

export default class OpenApi {
    private static DEFAULT_EXCLUDED_FOLDER = 'node_modules';
    private static DEFAULT_GLOB_OPTIONS = { ignore: '**/node_modules/**' };
    // eslint-disable-next-line prefer-named-capture-group
    private static COMMENTS_PATTERN = /((\/\*\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm;
    private static BREAK_LINE = /\n/g;

    constructor(
        private readonly config: OpenApiConfig,
    ) {
    }

    private globFilesMatches = (
        baseDir: string,
        filesPattern: string,
        excludedFolder: string = OpenApi.DEFAULT_EXCLUDED_FOLDER,
    ) => {
        try {
            const files = glob.sync(path.resolve(baseDir, filesPattern), OpenApi.DEFAULT_GLOB_OPTIONS);
            return files.filter((file) => !file.includes(excludedFolder));
        } catch (error) {
            throw new Error('Error Glob Files');
        }
    }

    private readFile(filePath: string): string {
        return fs.readFileSync(filePath).toString();
    }

    private readFiles(files: string[]): string[] {
        if (!files || !Array.isArray(files)) {
            return [];
        }
        return files.map((file) => this.readFile(file));
    }


    private getComments = (text) => {
        const comments = text.match(OpenApi.COMMENTS_PATTERN);
        if (comments) {
            const filterComments = comments.filter((comment) => comment.match(OpenApi.BREAK_LINE));
            return filterComments.map((comment) => comment.trim());
        }
        return [];
    };

    private getOnlyComments(fileContents: string[] = []) {
        if (!Array.isArray(fileContents)) {
            return [];
        }
        const comments = fileContents.map((comment) => {
            const trimedComments = comment.trim();
            return this.getComments(trimedComments);
        });
        return [].concat(...comments).filter((comment) => (comment[0] === '/' && comment[1] !== '/'));
    }

    private jsdocInfo(comments): any[] {
        if (!comments || !Array.isArray(comments)) {
            return [];
        }
        return comments.map((comment) => {
            const jsDocComment = doctrine.parse(comment, { unwrap: true });
            return jsDocComment;
        });
    }

    private parseYamlComments(jsDoc: any[]) {
        const yamlComments = []
        for (const doc of jsDoc) {
            for (const tag of doc.tags) {
                if (tag.title === 'openapi') {
                    yamlComments.push(tag.description)
                }
            }
        }
        return yamlComments;
    }

    private parseJsonCommentsFromYaml(yamlComments): object[] {
        const jsons = []
        for (const doc of yamlComments) {
            const parsed = YAML.parseDocument(doc);

            const anchors = parsed.anchors.getNames();
            if (anchors.length) {
                throw new Error('Error parsing YAML comments');
            } else if (parsed.errors && parsed.errors.length) {
                throw new Error('Error parsing YAML comments');
            } else {
                jsons.push(parsed.toJSON());
            }
        }
        return jsons;
    }

    private mergeDeep(first, second) {
        return mergeWith({}, first, second, (x, y) => (y === null ? x : undefined));
    }

    private removeEmptyKeys(obj) {
        if (!obj) {
            return {};
        }
        Object.keys(obj).forEach((key) => {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        });
        return obj;
    }

    private buildOpenApiObject(jsonComments: object[]): OpenAPIObject {
        const openApi: OpenAPIObject = this.removeEmptyKeys({
            openapi: '3.0.0',
            info: this.config.info,
            servers: this.config.servers,
            paths: this.config.paths || {},
            components: {
                ...this.config.components,
                schemas: this.config.components.schemas || {},
            },
            security: this.config.security,
            tags: this.config.tags,
            externalDocs: this.config.externalDocs,
        });

        for (const jsonComment of jsonComments) {
            for (const key of Object.keys(jsonComment)) {
                if (key.startsWith('/')) {
                    openApi.paths[key] = this.mergeDeep(openApi.paths[key], jsonComment[key]);
                } else {
                    openApi.components.schemas[key] = jsonComment[key];
                }
            }
        }

        return openApi;
    }

    generateDocs(): OpenAPIObject {
        const files = this.globFilesMatches(this.config.baseDir, this.config.filesPattern);
        const fileContents = this.readFiles(files);
        const comments = this.getOnlyComments(fileContents);
        const jsDocInfo = this.jsdocInfo(comments)
        const yamlComments = this.parseYamlComments(jsDocInfo)
        const jsonComments = this.parseJsonCommentsFromYaml(yamlComments)
        return this.buildOpenApiObject(jsonComments);
    }
}
