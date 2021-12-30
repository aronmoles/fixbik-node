/* eslint-disable no-undef */
import * as fs from 'fs';
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const Container = new ContainerBuilder();
const loader = new YamlFileLoader(Container);
const env = process.env.NODE_ENV || 'dev';

const configFile = `${__dirname}/config/app_${env}.yaml`;
if (fs.existsSync(configFile)) {
    loader.load(configFile);
} else {
    throw new Error(`Not exists <${configFile}> configuration file`)
}

Container.compile()

export default Container;