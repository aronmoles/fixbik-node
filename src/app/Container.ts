import DependencyContainer from '@microk/core/infrastructure/di/DependencyContainer';
import { configEnvDependencyContainer } from './config';
import { EnvMode } from './ProcessEnv';

const container = new DependencyContainer();

const env = process.env.NODE_ENV || 'dev';

configEnvDependencyContainer(container, env as EnvMode);

export default container;
